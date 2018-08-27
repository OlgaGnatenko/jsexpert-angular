import { ItemList } from "./catalog-item.model";
import { Film } from "./film.model";
import { Person } from "./person.model";

export class CatalogOption {
    value: string;
    viewValue: string;
}

export class CatalogSettings {
    search?: string;
    noItemsText: string;
    pagination?: boolean;
    continuousPagination: boolean;
}

export type CatalogContent = ItemList<Film> | ItemList<Person>;

