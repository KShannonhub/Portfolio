import { Routes } from '@angular/router';
import { MainAppComponent } from './main-app/main-app.component'; // adjust the path according to your project structure
import { AboutComponent } from './main-app/about/about.component';
import { DemoComponent } from './main-app/demo/demo.component';

export const routes: Routes = [
    { path: 'home', component: MainAppComponent },
    { path: 'about', component: AboutComponent },
    { path: 'demo', component: DemoComponent },
];
