import { Component, OnInit, Input } from '@angular/core';
import { ContentfulService } from './contentful.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'articles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './html/articles.component.html',
  styleUrls: ['./css/app.component.css', './css/articles.component.css'],
})
export class Articles implements OnInit {
  constructor(private contentfulService: ContentfulService) {}

  @Input() action!: (imageUrl: string, format?: string) => string;

  articles$: Observable<any> | undefined;
  backgroundColor: string = '';

  ngOnInit(): void {
    const contentTypeId = 'articlesPage';
    this.articles$ =
      this.contentfulService.getEntriesByContentType(contentTypeId);

    this.articles$.subscribe((data: any) => {
      this.backgroundColor =
        data.items[0].fields.stylingOptions.fields.backgroundColor || '';
    });
  }
}
