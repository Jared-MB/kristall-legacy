import {
	type MiddlewareConfig,
	type NextRequest,
	NextResponse,
} from "next/server";

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
		response = await fetch(`${process.env.SERVER_API}/auth/verify-token`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${cookie.value}`,
			},
		});
	} catch (error) {
		return NextResponse.redirect(
			new URL("/login", request.nextUrl).toString(),
			302,
		);
	}

	const data = await response.json();
	if (data.statusCode >= 400 || data.status >= 400) {
		return NextResponse.redirect(
			new URL("/login", request.nextUrl).toString(),
			302,
		);
	}

	const from = new URL(request.url).pathname;

	if (data.status === 200) {
		if (from.startsWith("/")) {
			return NextResponse.next();
		}

		return NextResponse.redirect(new URL("/", request.nextUrl).toString(), 302);
	}
}

export const config: MiddlewareConfig = {
	matcher:
		"/((?!_next/static|_next/image|favicon.ico|login|register|health-check).*)",
};