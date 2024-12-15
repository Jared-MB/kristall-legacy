export interface Category {
	_id: string;
	name: string;
}

export interface CategoryDetail extends Category {
	count: string;
}
