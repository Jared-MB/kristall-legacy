"use server";

import type { SafeBankAccount } from "@/core/modules/bank-account/interfaces";
import { getBankAccountsService } from "../_services";

export const getBankAccounts = async (): Promise<SafeBankAccount[]> => {
	const { data } = await getBankAccountsService();
	return data;
};
