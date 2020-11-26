import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NzPaginationModule} from 'ng-zorro-antd/pagination';
import {NzTableModule} from 'ng-zorro-antd/table';
import {HeroesComponent} from './heroes.component';
import {HasRoleDirective} from '../has-role.directive';
import {PaginationComponent} from '../pagination/pagination.component';
import {KeycloakService} from '../keycloak.service';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let keycloakService;

  beforeEach(waitForAsync(() => {
    keycloakService = jasmine.createSpyObj('KeycloakService', ['hasRole']);
    keycloakService.hasRole.and.returnValue(true);

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        PaginationComponent,
        HasRoleDirective
      ],
      imports: [
        NzTableModule,
        NzPaginationModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        {provide: KeycloakService, useValue: keycloakService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
