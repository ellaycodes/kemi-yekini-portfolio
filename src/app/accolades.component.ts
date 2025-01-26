import { Component, OnInit, Input } from '@angular/core';
import { ContentfulService } from './contentful.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'accolades',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './html/accolades.component.html',
    styleUrls: ['../../css-dist/app.component.min.css', '../../css-dist/accolades.component.min.css']
})
export class Accolades implements OnInit {
  constructor(private contentfulService: ContentfulService) {}

  @Input() action!: (imageUrl: string, format?: string) => string;

  accolades$: Observable<any> | undefined;
  backgroundColor: string = '';

  ngOnInit(): void {
    const contentTypeId = 'accoladesPage';
    this.accolades$ =
      this.contentfulService.getEntriesByContentType(contentTypeId);

      this.accolades$.subscribe((data: any) => {
        this.backgroundColor = data.items[0].fields.stylingOptions.fields.backgroundColor || ''
      })
  }
}
