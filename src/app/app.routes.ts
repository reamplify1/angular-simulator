import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { UsersComponent } from './users/users.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [

  { path: '', component: HomePageComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'users', component: UsersComponent },
  { path: '**', component: NotFoundPageComponent }
];
