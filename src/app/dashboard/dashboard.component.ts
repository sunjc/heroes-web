import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';
import {Pageable, PageRequest} from '../page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  pageable: Pageable;

  constructor(private heroService: HeroService) {
  }

  ngOnInit() {
    this.initPageRequest();
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes(this.pageable)
      .subscribe(page => {
        this.heroes = page.content;
      });
  }

  private initPageRequest(): void {
    this.pageable = new PageRequest();
    this.pageable.size = 4;
  }
}
