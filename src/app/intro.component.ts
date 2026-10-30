import { Component, OnInit, Input } from '@angular/core';
import { ContentfulService } from './contentful.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'intro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './html/intro.component.html',
  styleUrl: './css/intro.component.css',
})
export class Intro implements OnInit {
  @Input() action!: (imageUrl: string, format?: string) => string;

  constructor(private contentfulService: ContentfulService) {}

  intro$: Observable<any> | undefined;
  bookmark$: Observable<any> | undefined;

  ngOnInit(): void {
    this.intro$ = this.contentfulService.getEntriesByContentType('introductionPage');
    this.bookmark$ = this.contentfulService.getEntriesByContentType('bookmark');
  }
}
