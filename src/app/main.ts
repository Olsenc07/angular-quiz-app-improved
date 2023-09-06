import 'zone.js/dist/zone';
import { bootstrapApplication } from '@angular/platform-browser';
import { type ApplicationRef, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// avoid having application logic
// activate first module
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule, BrowserAnimationsModule),
  ],
})
  .then((started: ApplicationRef) => {
    console.log('Start up is working', started);
  })
  .catch((err: any) => {
    console.error('error has occured on start up', err);
  });
