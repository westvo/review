import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { HeroService } from '../services/hero.service';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatExpansionModule,
    MatChipsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    HttpClientModule,
  ],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss',
})
export class HeroListComponent implements OnInit {
  options: any[] = [
    'Algorithms',
    'Data Structures',
    'HTML',
    'CSS',
    'Javascript',
    'Nodejs',
    'Angular',
    'MySQL',
    'GIT',
    'SOLID',
    'OOP',
    'Design Patterns',
    'SDLC',
    'Agile/Scrum',
    'TDD',
    'DDD',
    'Software Testing',
    'System Design',
    'Architectures',
    'Microservices',
    'UML',
    'Design Thinkings',

  ];
  panelOpenState = false;
  heroes$!: Observable<any[]>;
  selectedId = 0;

  constructor(private service: HeroService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.heroes$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.selectedId = parseInt(params.get('id')!, 10);
        return this.service.getHeroes();
      })
    );
  }
}
