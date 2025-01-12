import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';
import { HomePageComponent } from './features/home-page/home-page.component';

export const routes: Routes = [
  { path: '', redirectTo: "/home", pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: '**', component: PageNotFoundComponent },
];
