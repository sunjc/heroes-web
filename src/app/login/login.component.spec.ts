import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthenticationService} from '../authentication.service';
import {of} from 'rxjs/internal/observable/of';
import {MessageService} from '../message.service';
import {FormBuilder} from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authenticationService;

  beforeEach(fakeAsync(() => {
    authenticationService = jasmine.createSpyObj('AuthenticationService', ['login', 'logout']);
    authenticationService.login.and.returnValue(of(true));
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
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
