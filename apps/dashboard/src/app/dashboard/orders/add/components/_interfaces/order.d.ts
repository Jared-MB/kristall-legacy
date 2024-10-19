import type { z } from "zod";

export type AddOrder = z.infer<typeof AddOrderSchema>;
