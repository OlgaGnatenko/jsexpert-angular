import { Film } from "./film.model";
import { Person } from "./person.model";

export class BaseList {
    startPage?: number;
    endPage?: number;
    currentPage?: number;
    totalPages?: number;
    totalItems?: number;
}

export class ItemList<T> extends BaseList {
    items?: Array<T>;
}

export class PagedItemList<T> extends BaseList {
    itemsMap?: Map<number, Array<T>>;
}

export type CatalogItemList = ItemList<Film>|ItemList<Person>;


