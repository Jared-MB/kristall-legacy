export interface Pagination<T> {
	entities: T[];
	next: number | null;
	previous: number | null;
	page: number;
	hasMore: boolean;
	totalPages: number;
}
