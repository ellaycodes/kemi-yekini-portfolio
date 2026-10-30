import { Component, OnInit, Input } from '@angular/core';
import { ContentfulService } from './contentful.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'work',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './html/work.component.html',
  styleUrl: './css/work.component.css',
})
export class Work implements OnInit {
  constructor(private contentfulService: ContentfulService) {}

  @Input() action!: (imageUrl: string, format?: string) => string;

  work$: Observable<any> | undefined;

  ngOnInit(): void {
    this.work$ = this.contentfulService.getEntriesByContentType('bodyOfWorkPage');
  }
}
