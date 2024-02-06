import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import {
  ActivatedRoute,
  ParamMap,
  Router,
  RouterModule,
} from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { HeroService } from '../services/hero.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { CreateComponent } from '../create/create.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    MatExpansionModule,
    MatChipsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    HttpClientModule,
  ],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss',
})
export class HeroDetailComponent implements OnInit {
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

  hero$!: Observable<any>;

  panelOpenState = false;
  heroes$!: Observable<any[]>;
  selectedId = 0;

  animal: string = '';
  name: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HeroService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.heroes$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.selectedId = parseInt(params.get('id')!, 10);
        return this.service.getHeroes();
      })
    );
  }

  gotoHeroes(hero: any) {
    const heroId = hero ? hero.id : null;
    this.router.navigate(['/superheroes', { id: heroId, foo: 'foo' }]);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateComponent, {
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
