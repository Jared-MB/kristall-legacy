import type { z } from "zod";
import type { CreateUserSchema } from "../validator";

export type CreateUser = z.infer<typeof CreateUserSchema>;

export type Role = "admin" | "user" | "SuperAdmin";
export type Package = "basic" | "standard" | "plus";

export type Permission = `${string}:${string}`;

interface Subscription {
	isSubscribed: boolean;
	hasCanceled: boolean;
	isSubscribedUntil: number;
}

export interface User {
	_id: string;
	username: string;
	name: string;
	email: string;
	role: Role | null;
	// shop: Shop;
	package: Package | null;
	stripeId: string;
	createdAt: Date | null;
	token: string;
	subscription: Subscription;
	permissions: string;
}
