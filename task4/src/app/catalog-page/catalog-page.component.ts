import { Component, OnInit } from '@angular/core';
import { ItemList, CatalogData } from '../shared/models/catalog-item.model';
import { Film } from '../shared/models/film.model';
import { Person } from '../shared/models/person.model';
import { CatalogOption } from '../shared/models/catalog-option.model';
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


  loadItems(selectedOptionValue: string): void {
    this.loading = true;
    const page = this.data[this.selectedOptionValue].currentPage + 1;
    this.catalogPageService.loadMoreItems(this.selectedOptionValue, page).subscribe(
      data => {
        this.data[selectedOptionValue] = data;
        console.log("loadItems", this.data);
      },
      err => { console.error("Error while loading items"); },
      () => {
        this.loading = false;
        this.data[this.selectedOptionValue].currentPage = page;
        console.log("finished loading");
      }
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

