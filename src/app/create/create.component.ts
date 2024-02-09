import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { AngularEditorModule } from '@wfpena/angular-wysiwyg';
import { HeroService } from '../services/hero.service';
@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    HttpClientModule,
    AngularEditorModule,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  animal: string = '';
  name: string = '';
  html: string = '';


  constructor(
    public dialogRef: MatDialogRef<CreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public heroService: HeroService
  ) {
    console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  create() {
    if (this.data.id) {
      this.heroService.update(this.data).subscribe((data) => {
        this.dialogRef.close();
      });
    } else {
    this.heroService.create(this.data).subscribe((data) => {
      this.dialogRef.close();
    });
  }
  }
}
