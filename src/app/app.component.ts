import { Component } from '@angular/core';
import { BodyComponent } from './body.component'

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [BodyComponent],
    template: `
    <body-component />
  `
})
export class AppComponent {
  title = 'portfolio';
}
