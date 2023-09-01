import { type Routes } from '@angular/router';
// lazy loading of standalone components
// hence loadComponent

// ask about any params
export const routes: Routes = [
  {
    path: 'answers/:categories:questions',
    loadComponent: async () =>
      await import('../answers-page/answers-page.component').then(
        (mod: any) => mod.AnswersPageComponent
      ),
  },
  {
    path: 'home',
    title: 'main',
    loadComponent: async () =>
      await import('../home-page/home-page.component').then(
        (mod: any) => mod.HomePageComponent
      ),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
