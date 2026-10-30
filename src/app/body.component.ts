import { afterRender, Component, ElementRef } from '@angular/core';
import { Home } from './home.component';
import { Bio } from './bio.component';
import { Intro } from './intro.component';
import { Articles } from './articles.component';
import { Contact } from './contact.component';
import { Accolades } from './accolades.component';
import { Education } from './education.component';
import { Testimonials } from './testimonials.component';
import { Work } from './work.component';
import { Gallery } from './gallery.component';

@Component({
  selector: 'body-component',
  standalone: true,
  imports: [
    Home,
    Intro,
    Bio,
    Articles,
    Contact,
    Accolades,
    Education,
    Testimonials,
    Work,
    Gallery,
  ],
  template: `
    <home class="section" [action]="transformImage"/>
    <intro class="section" [action]="transformImage"/>
    <bio class="section" [action]="transformImage"/>
    <education class="section" />
    <work class="section" [action]="transformImage"/>
    <accolades class="section" [action]="transformImage"/>
    <gallery class="section" [action]="transformImage"/>
    <articles class="section" [action]="transformImage"/>
    <testimonials class="section" />
    <contact class="section" />
  `
})
export class BodyComponent {

  transformImage(imageUrl: string, format: string = 'webp', quality: number = 80): string {
    if (!imageUrl) {
      return '';
    }

    if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
      imageUrl = 'https://' + imageUrl;
    }

    const url = new URL(imageUrl);
    url.searchParams.set('fm', format);
    url.searchParams.set('q', quality.toString());

    return url.toString();
  }
}
