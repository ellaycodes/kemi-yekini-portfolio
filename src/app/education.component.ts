import { Component, OnInit } from "@angular/core";
import { ContentfulService } from "./contentful.service";
import { Observable } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'education',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './html/edu.component.html',
    styleUrl: './css/edu.component.css'
})

export class Education implements OnInit{
    constructor(private contentfulService: ContentfulService) {}

    edu$: Observable<any> | undefined;

    ngOnInit(): void {
        this.edu$ = this.contentfulService.getEntriesByContentType('educationPage');
    }
}
