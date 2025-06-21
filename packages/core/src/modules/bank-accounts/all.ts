"use server";

import { GET } from "nexum";
import { BANK_ACCOUNT_TAGS } from "./constants/bank-accounts.tags";
import type { SafeBankAccount } from "./interfaces";

export async function getBankAccounts(): Promise<
	SafeBankAccount[] | undefined
> {
	const { data } = await GET<SafeBankAccount[]>("/bank-accounts/safe", {
		tags: [BANK_ACCOUNT_TAGS.SAFE],
		cache: "force-cache",
	});

	return data;
}
