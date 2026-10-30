import { Component, OnInit } from "@angular/core";
import { ContentfulService } from "./contentful.service";
import { Observable } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'testimonials',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './html/testimonials.component.html',
    styleUrl: './css/testimonials.component.css'
})

export class Testimonials implements OnInit{
constructor(private contentfulService: ContentfulService) {}

  testimonials$: Observable<any> | undefined;

  ngOnInit(): void {
    this.testimonials$ = this.contentfulService.getEntriesByContentType('testimonialPage');
  }
}
