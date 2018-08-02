import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroesComponent} from './heroes/heroes.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {LoginComponent} from './login/login.component';
import {CanActivateAuthGuard} from './can-activate.authguard';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [CanActivateAuthGuard]},
  {path: 'detail/:id', component: HeroDetailComponent, canActivate: [CanActivateAuthGuard]},
  {path: 'heroes', component: HeroesComponent, canActivate: [CanActivateAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
