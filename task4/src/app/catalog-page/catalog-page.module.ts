import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CatalogPageService } from './catalog-page.service';
import { CatalogPageComponent } from './catalog-page.component';
import { CatalogComponent } from './catalog/catalog.component';
import { FilmItemComponent } from './film-item/film-item.component';
import { PersonItemComponent } from './person-item/person-item.component';
import { UtilsService } from '../shared/services/utils.service';
import { APIConfig } from './api.config';
import { ProcessDataService } from './process-data.service';
import { CatalogItemComponent } from './catalog/catalog-item/catalog-item.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    CatalogPageComponent,
    CatalogComponent,
    FilmItemComponent,
    PersonItemComponent,
    CatalogItemComponent
  ],
  entryComponents: [
    FilmItemComponent,
    PersonItemComponent
  ],
  providers: [
    UtilsService,
    ProcessDataService,
    CatalogPageService,
    APIConfig
  ]
})
export class CatalogPageModule {}
