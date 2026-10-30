import { Routes } from '@angular/router';

// No route titles: the tab keeps the title set in index.html.
import { Bio } from './bio.component';
import { Intro } from './intro.component';
import { Education } from './education.component';
import { Work } from './work.component';
import { Testimonials } from './testimonials.component';
import { Accolades } from './accolades.component';
import { Articles } from './articles.component';
import { Contact } from './contact.component';
import { Home } from './home.component';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'intro', component: Intro },
  { path: 'bio', component: Bio },
  { path: 'education', component: Education },
  { path: 'work', component: Work },
  { path: 'testimonials', component: Testimonials },
  { path: 'accolades', component: Accolades },
  { path: 'articles', component: Articles },
  { path: 'contact', component: Contact },
];
