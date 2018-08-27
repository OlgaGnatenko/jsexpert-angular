import { Component, Input, OnInit, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { UtilsService } from '../../shared/services/utils.service';
import { CatalogContent, CatalogSettings } from '../../shared/models/catalog-option.model';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})

export class CatalogComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  content: CatalogContent;
  @Input()
  settings: CatalogSettings;

  itemsShown: number;
  itemsShownFrom: number;
  // cardsPerRow: number;

  constructor(private utils: UtilsService, element: ElementRef) {
  }

  ngOnInit() {
    this.itemsShown = 0;
    this.itemsShownFrom = 0;
    console.log("init", this.content, this.settings);
  }

  ngAfterViewInit() {
    console.log("afterviewinit", this.content, this.settings);
  }

  ngOnDestroy() {

  }

  // searchFilms(search: string): void {
  //   this.search = search;
  //   // if search string is less than 2 symbols, then we should not search yet
  //   if (this.search.length < MIN_SEARCH_LENGTH && this.search.length > 0) {
  //     return;
  //   }
  //   this.filmList = this.filmsService.getFilmsByParams({
  //     "sort": this.currentSort.value,
  //     "filmsShown": this.filmsShown,
  //     search,
  //   });
  // }

}
