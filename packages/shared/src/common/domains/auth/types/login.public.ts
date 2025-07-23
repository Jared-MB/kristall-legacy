import type { z } from "zod";
import type { LoginSchema } from "../validators/login-validator";

export type LoginUser = z.infer<typeof LoginSchema>;
