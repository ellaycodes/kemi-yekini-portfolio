import { Component, Input, OnInit } from '@angular/core';
import { ContentfulService } from './contentful.service';
import { Observable } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './html/home.component.html',
  styleUrl: '../../css-dist/home.component.min.css',
})
export class Home implements OnInit {
  @Input() action!: (imageUrl: string, format?: string) => string;

  constructor(private contentfulService: ContentfulService) {}

  homePage$: Observable<any> | undefined;
  backgroundImage: string = '';

  ngOnInit(): void {
    const contentTypeId = 'landingPage';
    this.homePage$ =
      this.contentfulService.getEntriesByContentType(contentTypeId);

    this.homePage$.subscribe((data: any) => {
      const originalUrl =
        data.items[0].fields.backgroundImage.fields.file.url || '';
      this.backgroundImage = this.action(originalUrl);
    });
  }
}