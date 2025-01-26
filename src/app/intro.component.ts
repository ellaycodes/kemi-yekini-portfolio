import { Component, OnInit, Input } from '@angular/core';
import { ContentfulService } from './contentful.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'intro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './html/intro.component.html',
  styleUrls: ['./css/app.component.css', './css/intro.component.css'],
})
export class Intro implements OnInit {
  @Input() action!: (imageUrl: string, format?: string) => string;

  constructor(private contentfulService: ContentfulService) {}

  isBookmarkExpanded: boolean = false;
  intro$: Observable<any> | undefined;
  bookmark$: Observable<any> | undefined;
  backgroundColor: string = '';
  bookmarkBg: string = '';
  bmFontSize: number = 10;
  bmFontColor: string = '';

  ngOnInit(): void {
    const contentTypeId = 'introductionPage';
    const bookmarkId = 'bookmark';

    this.intro$ = this.contentfulService.getEntriesByContentType(contentTypeId);

    this.bookmark$ = this.contentfulService.getEntriesByContentType(bookmarkId);

    this.intro$.subscribe((data: any) => {
      this.backgroundColor =
        data.items[0].fields.stylingOptions.fields.backgroundColor || '';
    });

    this.bookmark$.subscribe((data: any) => {
      this.bookmarkBg =
        data.items[0].fields.stylingOptions.fields.backgroundColor || '';
      this.bmFontSize = data.items[0].fields.stylingOptions.fields.fontSize;
      this.bmFontColor = data.items[0].fields.stylingOptions.fields.fontColor;
    });
  }

  toggleBookmark(): void {
    this.isBookmarkExpanded = !this.isBookmarkExpanded;
  }

  getDynamicStyles() {
    return {
      '--bg-color': this.backgroundColor,
      '--bm-bg-color': this.bookmarkBg,
      '--bm-font-size': this.bmFontSize + 'px',
      '--bm-font-color': this.bmFontColor,
    };
  }
}
