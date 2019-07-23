import {Component, Inject, LOCALE_ID} from '@angular/core';
import {en_US, NzI18nService, zh_CN} from 'ng-zorro-antd';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
  selectedLanguage: string;
  currentDate: Date = new Date();

  supportLanguages = [
    {code: 'en', label: 'English'},
    {code: 'zh', label: '中文'}
  ];

  constructor(@Inject(LOCALE_ID) private localeId: string, private i18n: NzI18nService) {
    if (localeId === 'en-US') {
      this.selectedLanguage = 'en';
      this.i18n.setLocale(en_US);
    } else {
      this.selectedLanguage = 'zh';
      this.i18n.setLocale(zh_CN);
    }
  }

  switchLanguage() {
    window.location.href = `/${this.selectedLanguage}`;
  }
}
