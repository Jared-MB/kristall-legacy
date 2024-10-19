export interface PaginationEntity<T> {
	entities: T[];
	page: number;
	totalPages: number;
}

export interface Analytics {
	earningsByDay: [
		{
			date: string;
			earnings: number;
			cost: number;
		},
	];
}
