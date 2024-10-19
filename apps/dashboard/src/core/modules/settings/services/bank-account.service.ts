import type { ServerResponse } from "@/core/modules/http/interfaces";
import type { EnableBankAccounts, RemoveBankAccounts } from "../interfaces";

import { NEXT_TAGS } from "@/constants/tags";
import { GET, PATCH } from "@/core/modules/http";

const BASE_URL = "/settings";

export const getEnableBankAccountService = async (): Promise<
	ServerResponse<EnableBankAccounts>
> => {
	return await GET<EnableBankAccounts>(`${BASE_URL}/bank-accounts`, {
		tags: [NEXT_TAGS.GET_BANK_ACCOUNT_SETTINGS],
	});
};

export const getRemoveBankAccountService = async (): Promise<
	ServerResponse<RemoveBankAccounts>
> => {
	return await GET<RemoveBankAccounts>(`${BASE_URL}/remove-bank-accounts`, {
		tags: [NEXT_TAGS.GET_REMOVE_BANK_ACCOUNTS_SETTINGS],
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
