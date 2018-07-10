import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
// import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { FilmsListComponent } from './films-list/films-list.component';
import { FilmItemComponent } from './film-item/film-item.component';
// import { FormsModule } from '@angular/forms';
// import {MatCardModule} from '@angular/material/card';
// import {MatButtonModule} from '@angular/material/button';
// import {MatGridListModule} from '@angular/material/grid-list';
// import {MatSelectModule} from '@angular/material/select';
// import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    MainComponent,
    FilmsListComponent,
    FilmItemComponent
  ]
})
export class FilmCatalogModule { }
