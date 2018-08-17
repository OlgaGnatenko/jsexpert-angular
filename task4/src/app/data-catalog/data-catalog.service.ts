import { Injectable } from '@angular/core';
import { ItemList, ListParams } from '../shared/models/catalog-item.model';

export class DataCatalogService {
    getItemsByParams<T>(listParams: ListParams): ItemList<T> {
        const { search, itemsShown, searchField } = listParams;
        let itemsByParams: Array<T>;
        // return given number of pages
        if (itemsShown) {
            itemsByParams = itemsByParams.slice(0, itemsShown);
        }
        // apply search
        if (search && searchField) {
            // remove special symbols to make search safe
            const safeSearch = search.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
            itemsByParams = itemsByParams.filter((item) => item[searchField].toLowerCase().search(safeSearch) !== -1);
        }
        const lastPage = (itemsShown >= itemsByParams.length) ? true : false;

        return {
            items: itemsByParams.slice(),
            lastPage
        };
    }
}


