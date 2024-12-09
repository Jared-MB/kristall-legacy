import {
	type MiddlewareConfig,
	type NextRequest,
	NextResponse,
} from "next/server";

import type { ServerResponse } from "./core/modules/http/interfaces";
import { isUUID } from "./core/validators/isUUID";

export async function middleware(request: NextRequest) {
	const cookie = request.cookies.get("session");
	if (!cookie) {
		return NextResponse.redirect(
			new URL("/login", request.nextUrl).toString(),
			302,
		);
	}

	let response: null | Response = null;

	try {
		response = await fetch(`${process.env.SERVER_API}/user/permissions/own`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${cookie.value}`,
				Cookie: `session=${cookie.value}`,
			},
		});
	} catch (error) {
		return NextResponse.redirect(
			new URL("/login", request.nextUrl).toString(),
			302,
		);
	}

	const data = (await response.json()) as ServerResponse<string> & {statusCode: number};

	if (data.status >= 400 || data.statusCode >= 400) {
		return NextResponse.redirect(
			new URL("/login", request.nextUrl).toString(),
			302,
		);
	}

	const { data: permissions } = data;

	const isAdmin = permissions.includes("all");

	const readPermissions = permissions
		.split(";")
		.filter(
			(permission) =>
				permission.endsWith(":read") ||
				permissions.includes(":write") ||
				permissions.includes(":update") ||
				permissions.includes(":delete") ||
				permission.endsWith(":access"),
		)
		.join(";");

	const from = new URL(request.url).pathname;

	const requestPaths = from.split("/").splice(1);
	const paths = requestPaths.map((path) => {
		if (path === "add") return `${requestPaths[1]}:write`;
		if (isUUID.safeParse(path).success) return `${requestPaths[1]}:update`;
		return path;
	});

	const everyPathHasPermission = paths.every((path) => {
		return readPermissions.includes(path);
	});

	if (!everyPathHasPermission && !isAdmin) {
		const redirectTo = permissions.includes("dashboard:deny")
			? "/login"
			: "/dashboard";
		return NextResponse.redirect(
			`${process.env.DASHBOARD_URL ?? ""}${redirectTo}`,
			302,
		);
	}

	if (data.status === 200) {
		if (from.startsWith("/dashboard") || from.startsWith("/docs")) {
			return NextResponse.next();
		}

		return NextResponse.redirect(
			new URL("/dashboard", request.nextUrl).toString(),
			302,
		);
	}
}

export const config: MiddlewareConfig = {
	matcher:
		"/((?!_next/static|_next/image|favicon.ico|login|register|health-check).*)",
};
