export interface Giphy {
    data: Array<Images>;
    pagination: Pagination;
}

export interface Images {
    images: {
        fixed_height: object;
        original: object;
    };
}

export interface Pagination {
    count: number;
    offset: number;
    total_count: number;
}
