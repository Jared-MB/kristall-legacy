export interface Analytics {
	earningsByDay: {
		date: string;
		earnings: number;
		cost: number;
	}[];
}
