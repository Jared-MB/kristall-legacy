"use server";

import type { SafeBankAccount } from "../interfaces";

import { revalidateTag } from "next/cache";

import { NEXT_TAGS } from "@/constants/tags";

import {
	getSafeBankAccountsService,
	uploadBankAccountService,
} from "../services";
import { BankAccountSchema } from "../validators";

export const getSafeBankAccounts = async (): Promise<SafeBankAccount[]> => {
	const { data } = await getSafeBankAccountsService();
	return data;
};

export const uploadBankAccount = async (
	// _prevState: unknown,
	payload: FormData,
) => {
	const data = Object.fromEntries(payload.entries());

	const parsedData = BankAccountSchema.safeParse(data);

	if (!parsedData.success) {
		return
		// console.log(parsedData.error.flatten().fieldErrors);
		// return parsedData.error.flatten().fieldErrors;
	}

	await uploadBankAccountService(parsedData.data);
	revalidateTag(NEXT_TAGS.GET_BANK_ACCOUNTS);
};
