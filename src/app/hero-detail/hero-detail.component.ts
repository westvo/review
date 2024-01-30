import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { HeroService } from '../hero-list/hero.service';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [ CommonModule, FormsModule,],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss'
})
export class HeroDetailComponent implements OnInit {
  hero$!: Observable<any>;

  constructor(private route: ActivatedRoute, private router: Router, private service: HeroService) {
  }


  ngOnInit() {
    this.hero$ = this.route.paramMap.pipe(
        switchMap((params: ParamMap) => this.service.getHero(params.get('id')!)));
  }

  gotoHeroes(hero: any) {
    const heroId = hero ? hero.id : null;
    this.router.navigate(['/superheroes', {id: heroId, foo: 'foo'}]);
  }
}
