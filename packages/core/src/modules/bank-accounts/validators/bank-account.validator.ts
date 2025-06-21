import { z } from "zod";

export const BankAccountSchema = z.object({
	_id: z.string().uuid().optional(),
	bank: z.string().min(2),
	clabe: z.string().length(18),
	owner: z.string().min(3),
	accountNumber: z.string().optional(),
	/**
	 * Password is optional, keep it for future implementations
	 * on the backend for better security, but now it's not used
	 */
	password: z.string().optional(),
});
