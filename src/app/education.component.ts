import { Component, OnInit, signal } from "@angular/core";
import { ContentfulService } from "./contentful.service";
import { Observable } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'education',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './html/edu.component.html',
    styleUrls: ['../../css-dist/app.component.min.css', '../../css-dist/edu.component.min.css']
})

export class Education implements OnInit{
    title = signal('Education')
    constructor(private contentfulService: ContentfulService) {}
    
      edu$: Observable<any> | undefined;
      backgroundColor: string = '';
    
      ngOnInit(): void {
        const contentTypeId = 'educationPage';
        this.edu$ = this.contentfulService.getEntriesByContentType(contentTypeId);

        this.edu$.subscribe((data: any) => {
            this.backgroundColor = data.items[0].fields.stylingOptions.fields.backgroundColor || ''
          })
      }
}