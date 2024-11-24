"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getSessionCookie = async () => {
	const session = (await cookies()).get("session");
	if (!session) redirect("/login");
	return session.value;
};
