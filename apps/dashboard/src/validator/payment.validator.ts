import { z } from "zod";

export const PaymentValidatorSchema = z.object({
	paymentMethod: z.enum(["card", "transfer", "cash"]),
	bankAccount: z.string().optional(),
});

export type PaymentValidator = z.infer<typeof PaymentValidatorSchema>;
export type PaymentValidatorKeys = keyof PaymentValidator;
