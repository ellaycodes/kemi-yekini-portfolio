import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  PendingTasks,
  TransferState,
  ViewChild,
  afterNextRender,
  computed,
  inject,
  makeStateKey,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ContentfulService } from '../contentful.service';
import { CiteStyle, FormattedCitation, formatCitation } from './cite';
import {
  ABOUT_STATS,
  Award,
  PLACES,
  WIRE_ITEMS,
  FALLBACK_AWARDS,
  TALKS,
  BANDS,
  HERO_STATS,
  MOMENTS,
  OPENALEX_AUTHOR,
  PATH,
  PROFILE_LINKS,
  PUBLICATIONS,
  QUOTES,
  RESEARCH_COLUMNS,
  ROLES,
  STORIES,
  TILES,
} from './edition.data';

interface ModalView {
  eyebrow: string;
  title: string;
  meta?: string;
  img?: string;
  imgPosition?: string;
  body: string[];
  href?: string;
  linkText?: string;
  cite?: Record<CiteStyle, FormattedCitation>;
}

type Open = { kind: 'pub' | 'story'; index: number } | null;

const H_INDEX_KEY = makeStateKey<number>('edition-h-index');
const AWARDS_KEY = makeStateKey<Award[]>('edition-awards');
const BUILT_KEY = makeStateKey<string>('edition-built-at');

/** Joins the text of a Contentful rich-text field. */
function richText(doc: any): string {
  return (doc?.content ?? [])
    .map((block: any) => (block?.content ?? []).map((n: any) => n?.value ?? '').join(''))
    .filter((t: string) => t.trim())
    .join(' ')
    .trim();
}

type SendState = 'idle' | 'sending' | 'sent' | 'error';

@Component({
  selector: 'edition',
  standalone: true,
  templateUrl: './edition.component.html',
})
export class Edition implements OnInit, OnDestroy {
  private contentful = inject(ContentfulService);
  private transferState = inject(TransferState);
  private pendingTasks = inject(PendingTasks);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly roles = ROLES;
  readonly aboutStats = ABOUT_STATS;
  readonly path = PATH;
  readonly pubs = PUBLICATIONS;
  readonly columns = RESEARCH_COLUMNS;
  readonly bands = BANDS;
  readonly lead = STORIES[0];
  readonly talks = TALKS;
  readonly places = PLACES;
  readonly home = PLACES[0];
  readonly destinations = PLACES.slice(1).map((p, i) => ({
    ...p,
    /** Curved arc from Birmingham, lifted in the middle like a flight path. */
    arc: (() => {
      const h = PLACES[0];
      const mx = (h.x + p.x) / 2;
      const my = (h.y + p.y) / 2 - Math.min(90, Math.hypot(p.x - h.x, p.y - h.y) * 0.28);
      return `M${h.x} ${h.y} Q${mx.toFixed(1)} ${my.toFixed(1)} ${p.x} ${p.y}`;
    })(),
    delay: `${i * 2.2}s`,
  }));

  /** Live dateline, like a newspaper edition line. Ticks every 30 seconds in the browser. */
  private now = signal(new Date());
  readonly dateline = computed(() => {
    const d = this.now();
    const date = d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/London' });
    const time = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/London' });
    return `${date} · ${time} in Birmingham`;
  });
  readonly datelineShort = computed(() => {
    const d = this.now();
    const date = d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'Europe/London' });
    const time = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/London' });
    return `${date} · ${time} Birmingham`;
  });

  /** Stamped when the site is built, so it moves forward with every deploy. */
  readonly lastUpdated = (() => {
    const iso = this.transferState.get(BUILT_KEY, null) ?? new Date().toISOString();
    if (!this.isBrowser) this.transferState.set(BUILT_KEY, iso);
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/London' });
  })();

  /** Wire strip items, with the live h-index filled in. */
  readonly wire = computed(() => {
    const h = this.hIndex() ?? 13;
    return WIRE_ITEMS.map((t) => (t === '{hIndex}' ? `h-index ${h}, refreshed from OpenAlex` : t));
  });

  /** The newest paper gets a "New" tag while it is less than about a year old. */
  readonly newestIsRecent = Number(PUBLICATIONS[0].year) >= new Date().getFullYear() - 1;
  readonly moments = MOMENTS;
  readonly links = PROFILE_LINKS;
  readonly tiles = TILES;

  /** Hero portrait, bundled with the site so it is in the very first paint. */
  readonly portrait = '/assets/portrait-hero.webp';

  /** Live h-index from OpenAlex. Falls back to the figure in edition.data.ts. */
  private hIndex = signal<number | null>(this.transferState.get(H_INDEX_KEY, null));

  /** Testimonials, hard-coded in edition.data.ts so they render with the page. */
  readonly quotes = signal(QUOTES);

  /** 0 → 1 progress of the stats count-up. Server render shows final values. */
  private progress = signal(1);
  readonly heroStats = computed(() => {
    const eased = 1 - Math.pow(1 - this.progress(), 3);
    const h = this.hIndex();
    return HERO_STATS.map((s) => {
      const target = s.live === 'hIndex' && h ? h : s.value;
      return {
        label: s.label,
        value: Math.round(target * eased).toLocaleString('en-GB') + (s.suffix ?? ''),
      };
    });
  });

  /**
   * Awards from the old Contentful entry, fetched once at build time and baked into
   * the page (no runtime request). Temporary until the list is confirmed and hard-coded.
   */
  readonly awards = signal<Award[]>(this.transferState.get(AWARDS_KEY, FALLBACK_AWARDS));

  /** "Invite Kemi to speak" form, submitted to Netlify Forms. */
  readonly speakOpen = signal(false);
  readonly sendState = signal<SendState>('idle');

  readonly citeStyle = signal<CiteStyle>('apa');
  readonly copied = signal(false);

  readonly open = signal<Open>(null);
  readonly modal = computed<ModalView | null>(() => {
    const o = this.open();
    if (!o) return null;
    if (o.kind === 'pub') {
      const p = PUBLICATIONS[o.index];
      return {
        eyebrow: `${p.venue} · ${p.year}`,
        title: p.title,
        meta: p.authors,
        body: p.body,
        href: p.href,
        linkText: 'Read the paper',
        cite: p.cite ? { apa: formatCitation(p.cite, 'apa'), harvard: formatCitation(p.cite, 'harvard') } : undefined,
      };
    }
    const s = STORIES[o.index];
    return {
      eyebrow: s.place,
      title: s.title,
      img: s.img,
      imgPosition: s.imgPosition,
      body: s.body,
      href: s.href,
      linkText: s.linkText,
    };
  });

  @ViewChild('root') rootRef?: ElementRef<HTMLElement>;
  @ViewChild('stage') stageRef?: ElementRef<HTMLElement>;
  @ViewChild('pin') pinRef?: ElementRef<HTMLElement>;
  @ViewChild('closeButton') closeButton?: ElementRef<HTMLButtonElement>;

  private raf = 0;
  private lastFocus: HTMLElement | null = null;
  private teardown: Array<() => void> = [];

  constructor() {
    afterNextRender(() => {
      this.startAmbient();
      const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      if (reduce) return;
      this.startCountUp();
      this.startHeroMotion();
      this.startRevealFallback();
    });
  }

  ngOnInit(): void {
    this.loadHIndex();
    this.loadAwards();
  }

  /** Baked in at build time, then refreshed in the browser so it stays current. */
  private async loadHIndex(): Promise<void> {
    const done = this.pendingTasks.add();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    try {
      const res = await fetch(OPENALEX_AUTHOR, { signal: controller.signal });
      const json = await res.json();
      const h = Number(json?.summary_stats?.h_index);
      if (h > 0) {
        this.hIndex.set(h);
        this.transferState.set(H_INDEX_KEY, h);
      }
    } catch {
      /* keep the fallback figure */
    } finally {
      clearTimeout(timer);
      done();
    }
  }

  /** Server/prerender only: the browser reuses what the build baked in. */
  private loadAwards(): void {
    if (this.isBrowser || this.transferState.hasKey(AWARDS_KEY)) return;
    const done = this.pendingTasks.add();
    this.contentful.getEntriesByContentType('accoladesPage').subscribe({
      next: (data: any) => {
        const fromCms: Award[] = (data?.items?.[0]?.fields?.accolades ?? [])
          .map((a: any) => ({ title: a?.fields?.title ?? '', detail: richText(a?.fields?.description) }))
          .filter((a: Award) => a.title);
        const hasSwan = fromCms.some((a) => /SWAN|Best Female/i.test(a.title + a.detail));
        const awards = hasSwan ? fromCms : [...fromCms, ...FALLBACK_AWARDS];
        this.awards.set(awards);
        this.transferState.set(AWARDS_KEY, awards);
        done();
      },
      error: () => done(),
    });
  }

  ngOnDestroy(): void {
    if (!this.isBrowser) return;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.teardown.forEach((fn) => fn());
    document.body.style.overflow = '';
  }

  private startCountUp(): void {
    this.progress.set(0);
    const start = performance.now() + 450;
    const duration = 1700;
    const tick = (now: number) => {
      const p = Math.max(0, Math.min(1, (now - start) / duration));
      this.progress.set(p);
      if (p < 1) this.raf = requestAnimationFrame(tick);
    };
    this.raf = requestAnimationFrame(tick);
  }

  /**
   * Pins the cover and writes scroll progress (0 → 1) to --p on the stage.
   * CSS turns --p into the portrait receding and the statement arriving.
   * Works in every browser, phones included. When the cover is taller than the
   * screen (phones), it sticks by its bottom edge so the copy scrolls past first.
   */
  private startHeroMotion(): void {
    const stage = this.stageRef?.nativeElement;
    const pin = this.pinRef?.nativeElement;
    if (!stage || !pin) return;
    stage.classList.add('is-live');

    let queued = false;
    const update = () => {
      queued = false;
      const vh = window.innerHeight;
      const pinH = pin.offsetHeight;
      const lead = Math.max(0, pinH - vh);
      const range = Math.max(1, stage.offsetHeight - pinH);
      const scrolled = -stage.getBoundingClientRect().top;
      const p = Math.min(1, Math.max(0, (scrolled - lead) / range));
      stage.style.setProperty('--p', p.toFixed(4));
    };
    const onScroll = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    };
    const measure = () => {
      pin.style.top = `${Math.min(0, window.innerHeight - pin.offsetHeight)}px`;
      update();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    this.teardown.push(() => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
    });
    measure();
  }

  /** Clock, reading progress and the cursor light on cards. Quiet, and always real. */
  private startAmbient(): void {
    const clock = window.setInterval(() => this.now.set(new Date()), 30000);
    this.now.set(new Date());

    const root = this.rootRef?.nativeElement;
    let queued = false;
    const progress = () => {
      queued = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const read = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      root?.style.setProperty('--read', read.toFixed(4));
    };
    const onScroll = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(progress);
      }
    };
    const onPointer = (e: PointerEvent) => {
      const card = (e.target as HTMLElement | null)?.closest<HTMLElement>('.ed-cover, .ed-tile');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    root?.addEventListener('pointermove', onPointer, { passive: true });
    progress();
    this.teardown.push(() => {
      window.clearInterval(clock);
      window.removeEventListener('scroll', onScroll);
      root?.removeEventListener('pointermove', onPointer);
    });
  }

  /** Browsers without CSS scroll-driven animations get reveal-on-scroll instead. */
  private startRevealFallback(): void {
    const root = this.rootRef?.nativeElement;
    if (!root || CSS.supports?.('animation-timeline: view()') || !('IntersectionObserver' in window)) return;
    root.classList.add('ed-io');
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    root.querySelectorAll('.ed-rise, .ed-pop, .ed-slide, .ed-cover, .ed-secthead').forEach((el) => io.observe(el));
    this.teardown.push(() => io.disconnect());
  }

  setCiteStyle(style: CiteStyle): void {
    this.citeStyle.set(style);
    this.copied.set(false);
  }

  /** Copies the citation, keeping italics when pasted into Word or Google Docs. */
  async copyCitation(): Promise<void> {
    const c = this.modal()?.cite?.[this.citeStyle()];
    if (!c || !this.isBrowser) return;
    try {
      if ('ClipboardItem' in window && navigator.clipboard?.write) {
        await navigator.clipboard.write([
          new ClipboardItem({
            'text/plain': new Blob([c.text], { type: 'text/plain' }),
            'text/html': new Blob([c.html], { type: 'text/html' }),
          }),
        ]);
      } else {
        await navigator.clipboard.writeText(c.text);
      }
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2200);
    } catch {
      /* clipboard blocked: the citation text stays selectable on screen */
    }
  }

  openSpeak(): void {
    if (this.isBrowser) {
      this.lastFocus = document.activeElement as HTMLElement | null;
      document.body.style.overflow = 'hidden';
    }
    this.sendState.set('idle');
    this.speakOpen.set(true);
    setTimeout(() => this.closeButton?.nativeElement.focus());
  }

  /** Posts to the static skeleton file, as Netlify requires for SSR sites. */
  async sendInvite(event: Event): Promise<void> {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    this.sendState.set('sending');
    try {
      const body = new URLSearchParams(new FormData(form) as any).toString();
      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });
      if (!res.ok) throw new Error(String(res.status));
      this.sendState.set('sent');
      form.reset();
    } catch {
      this.sendState.set('error');
    }
  }

  openPub(index: number): void {
    this.show({ kind: 'pub', index });
  }

  openStory(index: number): void {
    this.show({ kind: 'story', index });
  }

  private show(o: Open): void {
    if (this.isBrowser) {
      this.lastFocus = document.activeElement as HTMLElement | null;
      document.body.style.overflow = 'hidden';
    }
    this.copied.set(false);
    this.open.set(o);
    setTimeout(() => this.closeButton?.nativeElement.focus());
  }

  @HostListener('document:keydown.escape')
  close(): void {
    if (!this.open() && !this.speakOpen()) return;
    this.open.set(null);
    this.speakOpen.set(false);
    if (this.isBrowser) {
      document.body.style.overflow = '';
      this.lastFocus?.focus();
    }
  }
}
