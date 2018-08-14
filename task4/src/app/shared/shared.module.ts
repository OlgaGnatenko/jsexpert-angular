import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material';
import { BarRatingModule } from "ngx-bar-rating";


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    BarRatingModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    BarRatingModule
  ]
})

export class SharedModule {

}
