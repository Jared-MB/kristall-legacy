export interface Pagination<T> {
	entities: T[];
	page: number;
	totalPages: number;
}
