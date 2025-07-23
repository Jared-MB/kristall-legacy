import type { Session } from "@kristall/shared/domains/auth/types/session.private";
import { redirect } from "next/navigation";

import { verifySession } from "./verify-session";

import { getCookie } from "../cookies";
import { AvailableCookies } from "../cookies/available";

type AuthenticatedFunction<TArgs extends unknown[], TReturn> = (
	session: Session,
	...args: TArgs
) => Promise<TReturn>;

export function withAuth<TArgs extends unknown[], TReturn>(
	fn: AuthenticatedFunction<TArgs, TReturn>,
): (...args: TArgs) => Promise<TReturn> {
	return async (...args: TArgs): Promise<TReturn> => {
		const cookie = await getCookie(AvailableCookies.SESSION);

		if (!cookie) {
			redirect("/login");
		}

		const session = await verifySession();

		if (!session) {
			redirect("/login");
		}

		return await fn(session, ...args);
	};
}
