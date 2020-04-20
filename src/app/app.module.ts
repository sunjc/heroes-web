import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  en_US,
  NZ_CONFIG,
  NZ_I18N,
  NzButtonModule,
  NzCheckboxModule,
  NzConfig,
  NzFormModule,
  NzGridModule,
  NzInputModule,
  NzPaginationModule,
  NzRadioModule,
  NzTableModule
} from 'ng-zorro-antd';

import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {HeroesComponent} from './heroes/heroes.component';
import {HeroSearchComponent} from './hero-search/hero-search.component';
import {MessagesComponent} from './messages/messages.component';
import {LoginComponent} from './login/login.component';
import {PaginationComponent} from './pagination/pagination.component';
import {AuthenticationInterceptor} from './authentication.interceptor';
import {HasRoleDirective} from './has-role.directive';

registerLocaleData(en);

const ngZorroConfig: NzConfig = {
  table: {nzSize: 'small', nzBordered: true},
};

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzGridModule,
    NzFormModule,
    NzInputModule,
    NzCheckboxModule,
    NzButtonModule,
    NzTableModule,
    NzPaginationModule,
    NzRadioModule
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
      {provide: NZ_I18N, useValue: en_US},
      {provide: NZ_CONFIG, useValue: ngZorroConfig}
    ]
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
