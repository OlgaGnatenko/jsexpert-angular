import { Film } from './film.model';
import { Person } from './person.model';

export class ListParams {
    itemsShown?: number;
    search?: string;
    searchField?: string;
}

export class ItemList<T> {
    items?: Array<T>;
    currentPage?: number;
    totalPages?: number;
    totalItems?: number;
}

export class CatalogData {
    films: ItemList<Film>;
    persons: ItemList<Person>;
}
