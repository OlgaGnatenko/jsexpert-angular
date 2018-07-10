import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './main/main.component';
import { FilmsListComponent } from './films-list/films-list.component';
import { FilmItemComponent } from './film-item/film-item.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    MainComponent,
    FilmsListComponent,
    FilmItemComponent
  ]
})
export class FilmCatalogModule { }
