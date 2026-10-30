import { Component, OnInit, Input } from '@angular/core';
import { ContentfulService } from './contentful.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './html/bio.component.html',
  styleUrl: './css/bio.component.css',
})
export class Bio implements OnInit {
  @Input() action!: (imageUrl: string, format?: string) => string;
  constructor(private contentfulService: ContentfulService) {}

  bio$: Observable<any> | undefined;

  ngOnInit(): void {
    this.bio$ = this.contentfulService.getEntriesByContentType('bio');
  }
}
