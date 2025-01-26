import { Component, OnInit, Input } from '@angular/core';
import { ContentfulService } from './contentful.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { marked } from 'marked';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './html/gallery.component.html',
  styleUrls: ['./css/app.component.css', './css/gallery.component.css'],
})
export class Gallery implements OnInit {
  gallery$: Observable<any> | undefined;
  backgroundColor: string = '';
  startIndex: number = 0;
  galleryLength: number = 0;
  activeCard: number = -1;
  allCardsExpanded: boolean = false;
  visibleCount: number = 3;

  constructor(
    private contentfulService: ContentfulService,
    private breakpointObserver: BreakpointObserver
  ) {}

  @Input() action!: (imageUrl: string, format?: string) => string;

  ngOnInit(): void {
    this.updateVisibleCount();
    const contentTypeId = 'contentBlock';
    this.gallery$ =
      this.contentfulService.getEntriesByContentType(contentTypeId);

    this.gallery$.subscribe({
      next: (data: any) => {
        this.backgroundColor =
          data.items[0].fields.stylingOptions.fields.backgroundColor || '';
        const gallery = data.items[0].fields.contentCard;
        this.galleryLength = gallery.length;
      },
      error: (err) => {
        console.error('Error fetching content:', err);
      },
    });
  }

  updateVisibleCount(): void {
    this.breakpointObserver
      .observe([
        '(max-width: 425px)',
        '(min-width: 425px) and (max-width: 768px)',
        '(min-width: 768px) and (max-width: 1440px)',
        '(min-width: 1441px)',
      ])
      .subscribe((result) => {
        if (result.breakpoints['(max-width: 425px)']) {
          this.visibleCount = 1; // Mobile
        } else if (
          result.breakpoints['(min-width: 425px) and (max-width: 768px)']
        ) {
          this.visibleCount = 2; // Tablet
        } else if (
          result.breakpoints['(min-width: 768px) and (max-width: 1440px)']
        ) {
          this.visibleCount = 3; // Laptops
        } else if (result.breakpoints['(min-width: 1441px)']) {
          this.visibleCount = 4; // Large screens
        }
      });
  }

  prevImage(): void {
    if (this.activeCard !== -1) {
      this.activeCard =
        this.activeCard > 0 ? this.activeCard - 1 : this.galleryLength - 1;
    } else {
      if (this.startIndex > 0) {
        this.startIndex -= 1;
      }
    }
  }

  nextImage(): void {
    if (this.activeCard !== -1) {
      this.activeCard = (this.activeCard + 1) % this.galleryLength;
    } else {
      if (this.startIndex + this.visibleCount < this.galleryLength) {
        this.startIndex += 1;
      }
    }
  }

  getVisibleImages(images: any[]): any[] {
    if (this.allCardsExpanded) {
      return [images[this.activeCard]];
    }

    return images.slice(this.startIndex, this.startIndex + this.visibleCount)
      .length === this.visibleCount
      ? images.slice(this.startIndex, this.startIndex + this.visibleCount)
      : [
          ...images.slice(this.startIndex),
          ...images.slice(
            0,
            this.visibleCount - images.slice(this.startIndex).length
          ),
        ];
  }

  transformMarkdownToHTML(markdown: string) {
    return marked(markdown);
  }

  toggleCard(index: number) {
    const selectedImage = this.startIndex + index;
    if (this.allCardsExpanded) {
      return;
    }
    this.allCardsExpanded = true;
    this.activeCard =
      selectedImage < this.galleryLength
        ? selectedImage
        : this.galleryLength - 1;
  }

  closeExpandedView(): void {
    this.allCardsExpanded = false;
    this.activeCard = -1;
  }
}
