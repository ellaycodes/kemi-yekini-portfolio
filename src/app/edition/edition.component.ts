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
import { CiteStyle, FormattedCitation, formatCitation } from './cite';
import {
  ABOUT_STATS,
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

@Component({
  selector: 'edition',
  standalone: true,
  templateUrl: './edition.component.html',
})
export class Edition implements OnInit, OnDestroy {
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
      const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      if (reduce) return;
      this.startCountUp();
      this.startHeroMotion();
      this.startRevealFallback();
    });
  }

  ngOnInit(): void {
    this.loadHIndex();
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
    root.querySelectorAll('.ed-rise, .ed-pop, .ed-slide, .ed-cover').forEach((el) => io.observe(el));
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
    if (!this.open()) return;
    this.open.set(null);
    if (this.isBrowser) {
      document.body.style.overflow = '';
      this.lastFocus?.focus();
    }
  }
}
