import type { UUID } from "node:crypto";

export interface Image {
	_id: UUID;
	url: string;
}
