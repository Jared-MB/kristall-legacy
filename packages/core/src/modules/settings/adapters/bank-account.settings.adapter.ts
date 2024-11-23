"use server";

import { revalidateTag } from "next/cache";

import { BANK_ACCOUNT_SETTINGS_TAGS } from "../constants";
import { bankAccountSettingsService } from "../services";

export const getEnableBankAccountSettings = async (): Promise<boolean> => {
	const { data } =
		await bankAccountSettingsService.getEnableBankAccountService();
	if (!data) {
		return false;
	}
	return data.enableBankAccounts;
};

export const getRemoveBankAccountSettings = async (): Promise<boolean> => {
	const { data } =
		await bankAccountSettingsService.getRemoveBankAccountService();
	if (!data) {
		return false;
	}
	return data.removeBankAccounts;
};

export const updateEnableBankAccountSettings = async (): Promise<void> => {
	await bankAccountSettingsService.updateEnableBankAccountService();
	revalidateTag(BANK_ACCOUNT_SETTINGS_TAGS.GET);
};

export const updateRemoveBankAccountSettings = async (): Promise<void> => {
	await bankAccountSettingsService.updateRemoveBankAccountService();
	revalidateTag(BANK_ACCOUNT_SETTINGS_TAGS.REMOVE_ON_DISABLE);
};
