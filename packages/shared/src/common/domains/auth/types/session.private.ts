import type { UUID } from "node:crypto";

export interface Session {
	_id: UUID;
	username: string;
	shop: { _id: UUID };
	role: "admin" | "user" | "SuperAdmin";
}
