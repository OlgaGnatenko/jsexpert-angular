export interface ListParams {
    itemsShown?: number;
    search?: string;
    searchField?: string;
}

export interface ItemList<T> {
    items: Array<T>;
    lastPage: Boolean;
}
