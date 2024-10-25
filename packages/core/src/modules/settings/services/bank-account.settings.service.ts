"use server";

import type { ServerResponse } from "@kristall/http/interfaces";
import type { EnableBankAccounts, RemoveBankAccounts } from "../interfaces";

import { GET, PATCH } from "@kristall/http";
import { BANK_ACCOUNT_SETTINGS_TAGS } from "../constants";

const BASE_URL = "/settings";

export const getEnableBankAccountService = async (): Promise<
	ServerResponse<EnableBankAccounts>
> => {
	return await GET<EnableBankAccounts>(`${BASE_URL}/bank-accounts`, {
		tags: [BANK_ACCOUNT_SETTINGS_TAGS.GET],
	});
};

export const getRemoveBankAccountService = async (): Promise<
	ServerResponse<RemoveBankAccounts>
> => {
	return await GET<RemoveBankAccounts>(`${BASE_URL}/remove-bank-accounts`, {
		tags: [BANK_ACCOUNT_SETTINGS_TAGS.REMOVE_ON_DISABLE],
	});
};

export const updateEnableBankAccountService = async (): Promise<
	ServerResponse<EnableBankAccounts>
> => {
	return await PATCH<any, EnableBankAccounts>(`${BASE_URL}/bank-accounts`, {});
};

export const updateRemoveBankAccountService = async (): Promise<
	ServerResponse<RemoveBankAccounts>
> => {
	return await PATCH<any, RemoveBankAccounts>(
		`${BASE_URL}/remove-bank-accounts`,
		{},
	);
};
