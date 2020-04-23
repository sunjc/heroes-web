import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {
  NzButtonModule,
  NzCheckboxModule,
  NzFormModule,
  NzIconModule,
  NzInputDirective,
  NzInputGroupComponent,
  NzInputGroupSlotComponent,
  NzOutletModule
} from 'ng-zorro-antd';
import {of} from 'rxjs/internal/observable/of';
import {LoginComponent} from './login.component';
import {AuthenticationService} from '../authentication.service';
import {MessageService} from '../message.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authenticationService;

  beforeEach(fakeAsync(() => {
    authenticationService = jasmine.createSpyObj('AuthenticationService', ['login', 'logout']);
    authenticationService.login.and.returnValue(of(true));
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        NzInputGroupComponent,
        NzInputGroupSlotComponent,
        NzInputDirective
      ],
      imports: [
        ReactiveFormsModule,
        NzFormModule,
        NzCheckboxModule,
        NzButtonModule,
        NzOutletModule,
        NzIconModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        {provide: FormBuilder},
        {provide: AuthenticationService, useValue: authenticationService},
        {provide: MessageService}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
