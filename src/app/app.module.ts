import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {HeroesComponent} from './heroes/heroes.component';
import {HeroSearchComponent} from './hero-search/hero-search.component';
import {MessagesComponent} from './messages/messages.component';
import {LoginComponent} from './login/login.component';
import {AuthenticationInterceptor} from './authentication.interceptor';
import {HasRoleDirective} from './has-role.directive';
import {en_US, NgZorroAntdModule, NZ_I18N} from 'ng-zorro-antd';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {PaginationComponent} from './pagination/pagination.component';

registerLocaleData(en);

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgZorroAntdModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    HeroSearchComponent,
    LoginComponent,
    PaginationComponent,
    HasRoleDirective
  ],
  providers: [
    [
      {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true},
      {provide: NZ_I18N, useValue: en_US}
    ]
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
