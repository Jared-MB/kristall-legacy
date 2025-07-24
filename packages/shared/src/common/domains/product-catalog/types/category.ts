import type { UUID } from "node:crypto";

export interface Category {
	_id: UUID;
	name: string;
	count: number;
}
