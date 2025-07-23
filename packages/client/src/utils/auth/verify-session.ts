"use server";

import { GET } from "@kristall/nexum";
import { STATUS } from "@kristall/nexum/status";
import type { Session } from "@kristall/shared/domains/auth/types/session.private";

import { AUTH_PRIVATE_ENDPOINTS } from "@kristall/shared/infrastructure/api/endpoints/auth/private";
import { redirect } from "next/navigation";

export const verifySession = async () => {
	const { data, status } = await GET<Session>(
		AUTH_PRIVATE_ENDPOINTS.VERIFY_SESSION,
		{
			cache: "no-store",
			tags: ["__SESSION__NO__CACHE__"],
		},
	);

	if (!data || status !== STATUS.OK) {
		redirect("/login");
	}

	return data;
};
