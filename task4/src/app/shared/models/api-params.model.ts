export class APIParams {
    type: string;
    URL: string;
    page: number;
}

export class APIResponse<T> {
    page?: number;
    results?: Array<T>;
    total_results?: number;
    total_pages?: number;
}
