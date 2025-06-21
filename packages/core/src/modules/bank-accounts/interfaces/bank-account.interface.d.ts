import type { z } from "zod";
import type { BankAccountSchema } from "../validators/bank-account.validator";

export type BankAccount = z.infer<typeof BankAccountSchema>;

export type SafeBankAccount = Required<
	Pick<BankAccount, "_id" | "bank" | "accountNumber">
>;
