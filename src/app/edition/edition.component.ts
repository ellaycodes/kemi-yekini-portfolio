import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ContentfulService } from '../contentful.service';
import {
  ABOUT_STATS,
  BANDS,
  HERO_STATS,
  MOMENTS,
  PATH,
  PROFILE_LINKS,
  PUBLICATIONS,
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
}

type Open = { kind: 'pub' | 'story'; index: number } | null;

@Component({
  selector: 'edition',
  standalone: true,
  templateUrl: './edition.component.html',
})
export class Edition implements OnInit, OnDestroy {
  private contentful = inject(ContentfulService);
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

  /** Hero portrait. Uses the portrait from Contentful when it loads. */
  readonly portrait = signal('/assets/portrait.jpeg');

  /** 0 → 1 progress of the stats count-up. Server render shows final values. */
  private progress = signal(1);
  readonly heroStats = computed(() => {
    const eased = 1 - Math.pow(1 - this.progress(), 3);
    return HERO_STATS.map((s) => ({
      label: s.label,
      value: Math.round(s.value * eased).toLocaleString('en-GB') + (s.suffix ?? ''),
    }));
  });

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

  @ViewChild('closeButton') closeButton?: ElementRef<HTMLButtonElement>;

  private raf = 0;
  private lastFocus: HTMLElement | null = null;

  constructor() {
    afterNextRender(() => this.startCountUp());
  }

  ngOnInit(): void {
    this.contentful.getEntriesByContentType('introductionPage').subscribe({
      next: (data: any) => {
        const url: string | undefined = data?.items?.[0]?.fields?.image?.fields?.file?.url;
        if (url) {
          const full = url.startsWith('http') ? url : 'https:' + url;
          this.portrait.set(`${full}?fm=webp&q=85&w=1100`);
        }
      },
      error: () => {
        /* keep the bundled portrait */
      },
    });
  }

  ngOnDestroy(): void {
    if (this.isBrowser && this.raf) cancelAnimationFrame(this.raf);
    if (this.isBrowser) document.body.style.overflow = '';
  }

  private startCountUp(): void {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
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
