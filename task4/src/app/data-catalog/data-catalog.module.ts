import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './../main/main.component';
import { CatalogComponent } from './catalog/catalog.component';
import { FilmItemComponent } from './../data-catalog/film-item/film-item.component';
import { PersonItemComponent } from './../data-catalog/person-item/person-item.component';
import { UtilsService } from '../shared/services/utils.service';


@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    MainComponent,
    CatalogComponent,
    FilmItemComponent,
    PersonItemComponent
  ],
  providers: [
    UtilsService
  ]
})
export class DataCatalogModule { }
