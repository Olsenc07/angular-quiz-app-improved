import { Routes } from '@angular/router';
// lazy loading of standalone components
// hence loadComponent
export const routes: Routes = [
  // wont work in browser open in new tab because of relative paths
  {
    path: 'answers/:categories:questions',
    loadComponent: () =>
      import('../answers-page/answers-page.component').then(
        (mod) => mod.AnswersPageComponent
      ),
  },
  {
    path: 'home',
    title: 'main',
    loadComponent: () =>
      import('../home-page/home-page.component').then(
        (mod) => mod.HomePageComponent
      ),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
