import type zod from "zod";
import type { LoginSchema, RegisterSchema } from "../validators";

export type RegisterUser = zod.infer<typeof RegisterSchema>;

export type LoginUser = zod.infer<typeof LoginSchema>;

export interface Authorized {
	access_token: string;
}
