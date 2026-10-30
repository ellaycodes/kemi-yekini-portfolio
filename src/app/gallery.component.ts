import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ContentfulService } from './contentful.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { marked } from 'marked';

@Component({
  selector: 'gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './html/gallery.component.html',
  styleUrl: './css/gallery.component.css',
})
export class Gallery implements OnInit {
  gallery$: Observable<any> | undefined;

  @ViewChild('track') track?: ElementRef<HTMLElement>;

  constructor(private contentfulService: ContentfulService) {}

  @Input() action!: (imageUrl: string, format?: string) => string;

  ngOnInit(): void {
    this.gallery$ = this.contentfulService.getEntriesByContentType('contentBlock');
  }

  // Scroll the row by one photo in the given direction (-1 or 1).
  scroll(direction: number): void {
    const track = this.track?.nativeElement;
    const slide = track?.querySelector<HTMLElement>('.slide');
    if (!track || !slide) {
      return;
    }
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: direction * (slide.offsetWidth + gap), behavior: 'smooth' });
  }

  transformMarkdownToHTML(markdown: string) {
    return marked(markdown);
  }
}
