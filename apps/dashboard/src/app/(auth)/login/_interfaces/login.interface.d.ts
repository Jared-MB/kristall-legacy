import type { z } from "zod";
import type { LoginSchema } from "../_validators";

export type Login = z.infer<typeof LoginSchema>;
