import { Component, OnInit } from '@angular/core';
import { CatalogData, ItemList } from '../shared/models/catalog-item.model';

import { CatalogOption, CatalogSettings, CatalogContent } from '../shared/models/catalog-option.model';
import { APIConfig } from './api.config';
import { CatalogPageService } from './catalog-page.service';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.css']
})
export class CatalogPageComponent implements OnInit {
  constructor(private catalogPageService: CatalogPageService, private config: APIConfig) { }

  data: CatalogData;
  loading: boolean;
  catalogOptions: CatalogOption[];
  selectedOptionValue: string;
  catalogSettings: CatalogSettings;
  catalogContent: CatalogContent;

  loadItems(selectedOptionValue: string): void {
    this.loading = true;
    const page = this.data[this.selectedOptionValue].currentPage + 1;
    this.catalogPageService.loadMoreItems(this.selectedOptionValue, page).subscribe(
      data => {
        this.data[selectedOptionValue] = data;
      },
      err => { console.error("Error while loading items", err); },
      () => {
        this.loading = false;
        this.data[this.selectedOptionValue].currentPage = page;
      }
    );
  }

  ngOnInit() {
    this.selectedOptionValue = "films";
    this.loading = false;

    this.catalogSettings = {
      noItemsText: "No Items Found",
      pagination: true,
      continuousPagination: true
    };

    this.catalogOptions = [{
      "value": "films",
      "viewValue": "Films"
    }, {
      "value": "persons",
      "viewValue": "Persons"
    }];
    this.data = {
      films: {
        items: [],
        currentPage: 0,
        totalPages: 0,
        totalItems: 0
      },
      persons: {
        items: [],
        currentPage: 0,
        totalPages: 0,
        totalItems: 0
      }
    };

    this.catalogContent = this.data[this.selectedOptionValue];

    // load first portion of data
    this.loadItems(this.selectedOptionValue);


  }

}

