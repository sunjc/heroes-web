import {Component, Inject, LOCALE_ID} from '@angular/core';
import {en_US, NzI18nService, zh_CN} from 'ng-zorro-antd';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
  currentLanguage: string;
  currentDate: Date = new Date();

  supportLanguages = [
    {code: 'en', label: 'English'},
    {code: 'zh', label: '中文'}
  ];

  constructor(@Inject(LOCALE_ID) private localeId: string, private i18n: NzI18nService) {
    if (localeId.startsWith('en')) {
      this.currentLanguage = 'en';
      this.i18n.setLocale(en_US);
    } else {
      this.currentLanguage = 'zh';
      this.i18n.setLocale(zh_CN);
    }
  }
}
