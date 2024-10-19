"use server";

import type { ServerResponse } from "@/core/interfaces/http";
import type { SafeBankAccount } from "@/core/modules/bank-account/interfaces";
import { GET } from "@/core/modules/http";

export const getBankAccountsService = async (): Promise<
	ServerResponse<SafeBankAccount[]>
> => {
	return await GET<SafeBankAccount[]>("/bank-accounts/safe");
};
