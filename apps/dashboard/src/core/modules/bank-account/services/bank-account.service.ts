import type { ServerResponse } from "@/core/modules/http/interfaces";
import type { BankAccount, SafeBankAccount } from "../interfaces";

import { NEXT_TAGS } from "@/constants/tags";
import { GET, POST } from "@/core/modules/http";

const BASE_URL = "/bank-accounts";

export const getSafeBankAccountsService = async (): Promise<
	ServerResponse<SafeBankAccount[]>
> => {
	return await GET<SafeBankAccount[]>(`${BASE_URL}/safe`, {
		tags: [NEXT_TAGS.GET_BANK_ACCOUNTS],
	});
};

export const uploadBankAccountService = async (
	bankAccount: BankAccount,
): Promise<ServerResponse<"ok">> => {
	return await POST<BankAccount, "ok">(BASE_URL, bankAccount);
};
