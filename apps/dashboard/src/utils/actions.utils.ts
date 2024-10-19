"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getSessionCookie = async () => {
	const session = cookies().get("session");
	if (!session) redirect("/login");
	return session.value;
};
