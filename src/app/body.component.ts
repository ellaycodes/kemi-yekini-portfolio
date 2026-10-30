import { Component } from '@angular/core';
import { Edition } from './edition/edition.component';

// The site is a single editorial page. The older Contentful-driven section
// components (Home, Intro, Bio, Gallery...) are still in the repo and routed,
// but no longer rendered here.
@Component({
  selector: 'body-component',
  standalone: true,
  imports: [Edition],
  template: `<edition />`,
})
export class BodyComponent {}
