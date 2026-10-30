import { Component, OnInit, Input } from '@angular/core';
import { ContentfulService } from './contentful.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'accolades',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './html/accolades.component.html',
    styleUrl: './css/accolades.component.css'
})
export class Accolades implements OnInit {
  constructor(private contentfulService: ContentfulService) {}

  @Input() action!: (imageUrl: string, format?: string) => string;

  accolades$: Observable<any> | undefined;

  ngOnInit(): void {
    this.accolades$ = this.contentfulService.getEntriesByContentType('accoladesPage');
  }
}
