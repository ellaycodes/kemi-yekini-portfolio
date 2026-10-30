import { Component, OnInit } from "@angular/core";
import { ContentfulService } from "./contentful.service";
import { Observable } from "rxjs";
import { CommonModule } from "@angular/common";


@Component({
    selector: 'contact',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './html/contact.component.html',
    styleUrl: './css/contact.component.css'
})

export class Contact implements OnInit{
    constructor(private contentfulService: ContentfulService) {}

      contact$: Observable<any> | undefined;

      ngOnInit(): void {
        this.contact$ = this.contentfulService.getEntriesByContentType('contactPage');
      }
}
