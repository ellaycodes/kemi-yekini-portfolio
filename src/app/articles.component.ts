import { Component, OnInit, Input } from '@angular/core';
import { ContentfulService } from './contentful.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'articles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './html/articles.component.html',
  styleUrl: './css/articles.component.css',
})
export class Articles implements OnInit {
  constructor(private contentfulService: ContentfulService) {}

  @Input() action!: (imageUrl: string, format?: string) => string;

  articles$: Observable<any> | undefined;

  ngOnInit(): void {
    this.articles$ = this.contentfulService.getEntriesByContentType('articlesPage');
  }
}
