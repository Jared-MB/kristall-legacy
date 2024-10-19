import type { z } from "zod";
import type { LoginSchema } from "../validators";

export interface Authorized {
	access_token: string;
}

export type Login = z.infer<typeof LoginSchema>;
