import { Component, OnInit } from "@angular/core";
import { ContentfulService } from "./contentful.service";
import { Observable } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'testimonials',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './html/testimonials.component.html',
    styleUrls: ['../../css-dist/app.component.min.css', '../../css-dist/testimonials.component.min.css']
})

export class Testimonials implements OnInit{
constructor(private contentfulService: ContentfulService) {}

  testimonials$: Observable<any> | undefined;
  backgroundColor: string = '';

  ngOnInit(): void {
    const contentTypeId = 'testimonialPage';
    this.testimonials$ = this.contentfulService.getEntriesByContentType(contentTypeId);

    this.testimonials$.subscribe((data: any) => {
        this.backgroundColor = data.items[0].fields.stylingOptions.fields.backgroundColor || ''
      })
  }
}