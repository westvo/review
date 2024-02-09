import { Observable } from 'rxjs';
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
import { MatListModule } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from '../create/create.component';

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
    MatListModule,
  ],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss',
})
export class HeroListComponent implements OnInit {
  options: any[] = [
    // 'Algorithms',
    // 'Data Structures',
    // 'HTML',
    // 'CSS',
    // 'Javascript',
    // 'Nodejs',
    // 'Angular',
    // 'MySQL',
    // 'GIT',
    // 'SOLID',
    // 'OOP',
    // 'Design Patterns',
    // 'SDLC',
    // 'Agile/Scrum',
    // 'TDD',
    // 'DDD',
    // 'Software Testing',
    // 'System Design',
    // 'Architectures',
    // 'Microservices',
    // 'UML',
    // 'Design Thinkings',
  ];
  panelOpenState = false;
  heroes$!: Observable<any[]>;
  selectedId = 0;

  constructor(private service: HeroService, private route: ActivatedRoute,
    private dialog: MatDialog) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.service.getCategories().subscribe((res: any) => {
      this.options = res.data;
    });
  }

  openDialog(item: any): void {
    const dialogRef = this.dialog.open(CreateComponent, {
      data: item,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getCategories();
    });
  }

}
