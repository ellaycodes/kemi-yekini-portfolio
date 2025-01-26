import { Component, OnInit, Input } from '@angular/core';
import { ContentfulService } from './contentful.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './html/bio.component.html',
  styleUrls: ['../../css-dist/app.component.min.css', '../../css-dist/bio.component.min.css'],
})
export class Bio implements OnInit {
  @Input() action!: (imageUrl: string, format?: string) => string;
  constructor(private contentfulService: ContentfulService) {}

  bio$: Observable<any> | undefined;
  backgroundColor: string = '';

  ngOnInit(): void {
    const contentTypeId = 'bio';
    this.bio$ = this.contentfulService.getEntriesByContentType(contentTypeId);

    this.bio$.subscribe((data: any) => {
      this.backgroundColor =
        data.items[0].fields.stylingOptions.fields.backgroundColor || '';
    });
  }
}
