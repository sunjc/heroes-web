import {Component, OnInit} from '@angular/core';

import {Hero} from '../hero';
import {HeroService} from '../hero.service';
import {Pageable, PageRequest} from '../page';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  pageable: Pageable = new PageRequest();

  totalItems = 0;

  constructor(private heroService: HeroService) {
  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes(this.pageable)
      .subscribe(page => {
        this.heroes = page.content;
        this.totalItems = page.totalElements;
      });
  }

  pageChanged(event: any): void {
    console.log('Page changed to: ' + event.pageIndex);
    this.pageable.page = event.pageIndex;
    this.pageable.size = event.pageSize;
    this.getHeroes();
  }

  sortChanged(sort: { key: any; value: string }): void {
    this.pageable.sort = sort;
    this.pageable.page = 1;
    this.getHeroes();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({name} as Hero)
      .subscribe(() => {
        this.pageable.page = 1;
        this.getHeroes();
      });
  }

  delete(hero: Hero): void {
    this.heroService.deleteHero(hero).subscribe(() => {
      this.pageable.page = 1;
      this.getHeroes();
    });
  }

}
