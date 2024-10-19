"use server";

import { NEXT_TAGS } from "@/constants/tags";
import { revalidateTag } from "next/cache";
import type { Settings } from "../interfaces";
import {
	getEnableBankAccountService,
	getRemoveBankAccountService,
	updateEnableBankAccountService,
	updateRemoveBankAccountService,
} from "../services";

type BankAccountSettings = Pick<
	Settings,
	"enableBankAccounts" | "removeBankAccounts"
>;

export const getEnableBankAccountSettings = async (): Promise<boolean> => {
	const { data } = await getEnableBankAccountService();
	return data.enableBankAccounts;
};

export const getRemoveBankAccountSettings = async (): Promise<boolean> => {
	const { data } = await getRemoveBankAccountService();
	return data.removeBankAccounts;
};

export const updateEnableBankAccountSettings = async (): Promise<void> => {
	await updateEnableBankAccountService();
	revalidateTag(NEXT_TAGS.GET_BANK_ACCOUNT_SETTINGS);
};

export const updateRemoveBankAccountSettings = async (): Promise<void> => {
	await updateRemoveBankAccountService();
	revalidateTag(NEXT_TAGS.GET_REMOVE_BANK_ACCOUNTS_SETTINGS);
};
