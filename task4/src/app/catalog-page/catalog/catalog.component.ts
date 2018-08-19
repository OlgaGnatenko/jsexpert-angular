import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

import { UtilsService } from '../../shared/services/utils.service';
import { DEBOUNCE_TIME, CARD_WIDTH, DEFAULT_ROW_COUNT, MIN_SEARCH_LENGTH } from '../../shared/constants';
import { FilmList } from '../../shared/models/film.model';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})

export class CatalogComponent implements OnInit, OnDestroy {
  favoritesCount: number;
  filmList: FilmList;

  showSearch = false;
  search: string;
  searchControl = new FormControl();
  searchControlSubscription: Subscription;

  resizeSubscription: Subscription;

  filmsShown: number;
  cardsPerRow: number;

  minSearchLength = MIN_SEARCH_LENGTH;

  searchStyleConfig = {
    'visibility': this.showSearch ? 'visible' : 'hidden'
  };

  constructor(private utils: UtilsService, element: ElementRef) {
  }

  ngOnInit() {
    this.search = "";

    // this.cardsPerRow = this.utils.getItemsPerRow(CARD_WIDTH);

    // this.filmsShown = this.cardsPerRow * DEFAULT_ROW_COUNT;

    // this.searchControlSubscription = this.searchControl.valueChanges
    //   .pipe(debounceTime(DEBOUNCE_TIME))
    //   .subscribe((str: string) => this.searchFilms(str));

    // this.resizeSubscription = fromEvent(window, 'resize')
    //   .pipe(debounceTime(DEBOUNCE_TIME))
    //   .subscribe((e: Event) => this.updatePagePerRow());
  }

  ngOnDestroy() {
    this.searchControlSubscription.unsubscribe();
    this.resizeSubscription.unsubscribe();
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

  updateFavorites(evt): void {
    const { favorite } = evt;
    favorite ? this.favoritesCount++ : this.favoritesCount--;
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
  }

  updatePagePerRow(): void {
    this.cardsPerRow = this.utils.getItemsPerRow(CARD_WIDTH);
  }

  // getMoreFilms(): void {
  //   const extraCardsInLastRow = this.filmsShown % this.cardsPerRow;
  //   const emptyCardSpaces = extraCardsInLastRow ? (this.cardsPerRow - extraCardsInLastRow) : 0;
  //   const newFilmsShown = this.filmsShown + this.cardsPerRow + emptyCardSpaces;
  //   this.filmList = this.filmsService.getFilmsByParams({
  //     "filmsShown": newFilmsShown,
  //     "sort": this.currentSort.value,
  //     "search": this.search
  //   });
  //   this.filmsShown = newFilmsShown;
  // }

}
