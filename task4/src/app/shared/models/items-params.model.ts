export class PageParams {
    startPage: number;
    endPage: number;
}

export class ItemsParams extends PageParams {
    search?: string;
    searchField?: string;
}


