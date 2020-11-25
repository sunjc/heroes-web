import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NZ_I18N, en_US} from 'ng-zorro-antd/i18n';
import {NzConfig, NZ_CONFIG} from 'ng-zorro-antd/core/config';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzPaginationModule} from 'ng-zorro-antd/pagination';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {NzTableModule} from 'ng-zorro-antd/table';
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
