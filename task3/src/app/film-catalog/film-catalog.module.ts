import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './main/main.component';
import { FilmsListComponent } from './films-list/films-list.component';
import { FilmItemComponent } from './film-item/film-item.component';
import { UtilsService } from '../shared/services/utils.service';


@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    MainComponent,
    FilmsListComponent,
    FilmItemComponent
  ],
  providers: [
    UtilsService
  ]
})
export class FilmCatalogModule { }
