import { z } from "zod";

export const AddCustomerSchema = z.object({
	_id: z.string().uuid().optional(),
	name: z.string().min(3).max(255),
});

export type AddCustomer = z.infer<typeof AddCustomerSchema>;
