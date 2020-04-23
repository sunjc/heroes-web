import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NzPaginationModule, NzTableModule} from 'ng-zorro-antd';
import {HeroesComponent} from './heroes.component';
import {HasRoleDirective} from '../has-role.directive';
import {PaginationComponent} from '../pagination/pagination.component';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  beforeEach(async(() => {
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
