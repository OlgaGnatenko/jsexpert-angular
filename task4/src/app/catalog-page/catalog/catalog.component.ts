import { Component, Input, OnInit, ElementRef, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { UtilsService } from '../../shared/services/utils.service';
import { CatalogContent } from '../../shared/models/catalog-content.model';
import { CatalogSettings } from '../../shared/models/catalog-settings.model';
import { PageParams } from '../../shared/models/items-params.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})

export class CatalogComponent implements OnInit, AfterViewInit {
  @Input()
  content$: Observable<CatalogContent>;
  @Input()
  settings: CatalogSettings;
  @Input()
  pages: PageParams;
  @Output()
  getItemsEvent: EventEmitter<PageParams> = new EventEmitter();

  constructor(private utils: UtilsService, element: ElementRef) {
  }


  ngOnInit() {
    console.log("init", this.content$, this.settings, this.pages);
  }

  ngAfterViewInit() {
    console.log("afterviewinit", this.content$, this.settings, this.pages);
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

  getItems(pages: PageParams) {
    this.getItemsEvent.emit(pages);
  }

  getMoreItems() {
    this.pages.endPage = this.pages.endPage + 1;
    this.getItems(this.pages);
  }

}
