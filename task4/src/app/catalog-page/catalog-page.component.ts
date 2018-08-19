import { Component, OnInit } from '@angular/core';
import { ItemList, CatalogData } from '../shared/models/catalog-item.model';
import { Film } from '../shared/models/film.model';
import { Person } from '../shared/models/person.model';
import { CatalogOption } from '../shared/models/catalog-option.model';
import { APIParams } from '../shared/models/api-params.model';
import { APIConfig } from './api.config';
import { CatalogPageService } from './catalog-page.service';
import { UtilsService } from '../shared/services/utils.service';

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
  apiParams: APIParams;

  setApiParams(selectedOptionValue: string, page: number): APIParams {
    const params: APIParams = new APIParams();
    params.type = selectedOptionValue;
    params.page = page;
    const apiField = `${this.selectedOptionValue}Url`;
    params.URL = `${this.config[apiField]}/?popular${this.config["params"]}`;
    return params;
  }

  loadItems(selectedOptionValue: string): void {
    this.loading = true;
    this.apiParams = this.setApiParams(this.selectedOptionValue, this.data[this.selectedOptionValue].currentPage);
    this.catalogPageService.loadMoreItems(this.apiParams).subscribe(
      data => {
        this.data[selectedOptionValue] = data;
        console.log("loadItems", this.data);
      },
      err => { console.error("Error while loading items"); },
      () => { this.loading = false; console.log("finished loading"); }
    );
  }

  ngOnInit() {
    this.selectedOptionValue = "films";
    this.loading = false;

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
          currentPage: 0,
          totalPages: 0,
          totalItems: 0
      }
    };

    // load first portion of data
    this.loadItems(this.selectedOptionValue);


  }

}

