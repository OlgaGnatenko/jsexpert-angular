import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatSelectModule,
    MatToolbarModule
  ],
  exports: [
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatSelectModule,
    MatToolbarModule
  ]
})

export class SharedModule {

}
