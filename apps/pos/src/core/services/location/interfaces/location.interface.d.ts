export interface Location {
	_id: string;
	name: string;
	address?: string;
	phone?: string;
}

export type LocationSummary = Pick<Location, "_id" | "name">;
