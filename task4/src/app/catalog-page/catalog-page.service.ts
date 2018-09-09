import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIConfig } from './api.config';
import { APIParams } from '../shared/models/api-params.model';
import { CatalogData } from '../shared/models/catalog-data.model';

import { Film } from '../shared/models/film.model';
import { Person } from '../shared/models/person.model';
import { CatalogOption } from '../shared/models/catalog-option.model';
import { map } from 'rxjs/operators';
import { Observable, of, Subject, forkJoin } from 'rxjs';
import { UtilsService } from '../shared/services/utils.service';
import { MAX_FILM_TITLE_LENGTH, MAX_FILM_DESCR_LENGTH, MAX_PERSON_NAME_LENGTH, MAX_PERSON_DESCR_LENGTH } from '../shared/constants';
import { ItemList, CatalogItemList, PagedItemList } from '../shared/models/item-list.model';
import { CatalogContent } from '../shared/models/catalog-content.model';
import { ItemsParams } from '../shared/models/items-params.model';
import { ProcessDataService } from './process-data.service';

@Injectable({
    providedIn: 'root'
})

export class CatalogPageService {
    data: CatalogData;
    apiParams: APIParams;
    private _currentItems: Subject<CatalogItemList>;

    constructor(private http: HttpClient, private utils: UtilsService, private processing: ProcessDataService, private config: APIConfig ) {
        this.data = {
            films: {
                itemsMap: new Map(),
                startPage: 0,
                endPage: 0,
                totalPages: 0,
                totalItems: 0
            },
            persons: {
                itemsMap: new Map(),
                startPage: 0,
                endPage: 0,
                totalPages: 0,
                totalItems: 0
            }
        };

        this._currentItems = new Subject<CatalogItemList>();
    }

    getItems(): Observable<CatalogItemList> {
        console.log("get items in service", this._currentItems);
        return this._currentItems.asObservable();
    }

    setApiParams(selectedOptionValue: string, page: number): APIParams {
        const params: APIParams = new APIParams();
        params.type = selectedOptionValue;
        params.page = page;
        const apiField = `${selectedOptionValue}Url`;
        params.URL = `${this.config[apiField]}/popular?${this.config["params"]}&page=${page}`;
        return params;
    }

    // getItemsByParams<T>(listParams: ListParams): Array<T> {
    //     const { search, itemsShown, searchField } = listParams;
    //     let itemsByParams: Array<T>;
    //     // return given number of pages
    //     if (itemsShown) {
    //         itemsByParams = itemsByParams.slice(0, itemsShown);
    //     }
    //     // apply search
    //     if (search && searchField) {
    //         // remove special symbols to make search safe
    //         const safeSearch = search.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
    //         itemsByParams = itemsByParams.filter((item) => item[searchField].toLowerCase().search(safeSearch) !== -1);
    //     }
    //     return itemsByParams.slice();
    // }

    provideItems(selectedOptionValue: string, itemsParams: ItemsParams): void {
        // gets data from startPage to endPage from existing data catalog or loads more items from db if needed
        const {startPage, endPage} = itemsParams;
        const selectedData = this.data[selectedOptionValue];
        const pageRange = Array.from(new Array(endPage - startPage + 1), (val, index) => index + startPage);
        const missingPageLoaders = pageRange
            .filter((page) => !selectedData.itemsMap.has(page))
            .map((page) => this.loadItems(selectedOptionValue, page));
        forkJoin(missingPageLoaders).subscribe((data: Array<CatalogItemList>) => {
            console.log("missing page loaders data", data);
            data.forEach((pageItem) => {
                console.log("pageItem", pageItem);
                const { currentPage, items, totalPages, totalItems } = pageItem;
                selectedData.itemsMap.set(currentPage, items);
                selectedData.totalPages = totalPages;
                selectedData.totalItems = totalItems;
                console.log("updated selected data", selectedData);
            });
            const newItems = [];
            pageRange.forEach((page) => {
                const pageItems = selectedData.itemsMap.get(page);
                newItems.push(...pageItems);
            });
            console.log("newItems", newItems);
            this._currentItems.next({
                items: newItems,
                startPage,
                endPage,
                totalPages: selectedData.totalPages,
                totalItems: selectedData.totalItems
            });
        });
    }

    loadItems(selectedOptionValue: string, page: number): Observable<CatalogItemList> {
        const apiParams = this.setApiParams(selectedOptionValue, page);
        return this.http.get(apiParams.URL)
            .pipe(
                map((data: Response) => {
                    const currentPage = data["page"];
                    const totalPages = data["total_pages"];
                    const totalItems = data["total_results"];
                    const items = this.processing.processItems(selectedOptionValue, data["results"]) as Array<Film>|Array<|Person>;
                    return {
                        currentPage,
                        totalPages,
                        totalItems,
                        items
                    } as CatalogItemList;
                })
            );
    }
}


