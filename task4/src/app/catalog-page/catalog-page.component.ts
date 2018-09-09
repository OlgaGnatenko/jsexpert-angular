import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemList } from '../shared/models/item-list.model';
import { CatalogData } from '../shared/models/catalog-data.model';

import { CatalogOption } from '../shared/models/catalog-option.model';
import { CatalogSettings } from '../shared/models/catalog-settings.model';
import { CatalogContent } from '../shared/models/catalog-content.model';
import { APIConfig } from './api.config';
import { CatalogPageService } from './catalog-page.service';
import { Observable, Subject, BehaviorSubject, Subscription } from 'rxjs';
import { ItemsParams, PageParams } from '../shared/models/items-params.model';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.css']
})
export class CatalogPageComponent implements OnInit, OnDestroy {
  constructor(private catalogPageService: CatalogPageService, private config: APIConfig) {
    this.catalogContent$ = new BehaviorSubject<CatalogContent>({
      items: []
    });
    this.itemsSubcription = this.catalogPageService.getItems().subscribe((data) => {
      this.loading = false;
      console.log("items subscription", data, this.loading);
      this.catalogContent$.next(data);
    });
  }

  loading: boolean;
  catalogOptions: CatalogOption[];
  selectedOptionValue: string;
  catalogSettings: CatalogSettings;
  catalogContent$: BehaviorSubject<CatalogContent>;
  catalogPageSettings: object;
  search: string;
  itemsSubcription: Subscription;

  formItemsParams(): ItemsParams {
    const {startPage, endPage} = this.catalogPageSettings[this.selectedOptionValue];
    const {searchField} = this.catalogOptions[this.selectedOptionValue];
    return {
      startPage,
      endPage,
      searchField,
      search: this.search
    };
  }

  requestItems(selectedOptionValue: string, pages: PageParams): void {
    this.loading = true;
    this.catalogPageService.provideItems(this.selectedOptionValue, pages);
  }


  updateCatalogItems($event): void {
    this.requestItems(this.selectedOptionValue, this.catalogPageSettings[this.selectedOptionValue]);
  }

  makeNotFoundText(selectedValue: string) {
    const selectedOption = this.catalogOptions.find((item) => item.value === selectedValue);
    if (!selectedOption) {
      return '';
    }
    return `${selectedOption.viewValue} не найдены.`;
  }

  ngOnInit() {
    this.selectedOptionValue = "films";
    this.loading = false;

    this.catalogPageSettings = {
      films: {
        startPage: 1,
        endPage: 1
      },
      persons: {
        startPage: 1,
        endPage: 1
      }
    };

    this.catalogOptions = [{
      "value": "films",
      "viewValue": "Фильмы",
      "searchField": "title"
    }, {
      "value": "persons",
      "viewValue": "Актеры",
      "searchField": "name"
    }];

    this.catalogSettings = {
      noItemsText: this.makeNotFoundText(this.selectedOptionValue),
      pagination: true,
      continuousPagination: true
    };

    // load first portion of data
    this.requestItems(this.selectedOptionValue, this.catalogPageSettings[this.selectedOptionValue]);
  }

  ngOnDestroy() {
    this.itemsSubcription.unsubscribe();
  }

}


