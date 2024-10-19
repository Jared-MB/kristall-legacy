import { z } from "zod";

export const AddExpenseSchema = z.object({
	concept: z.string(),
	amount: z.preprocess((val) => Number(val), z.number().positive()),
	date: z.date(),
});
