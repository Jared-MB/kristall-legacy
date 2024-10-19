import type { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export interface ServerConnectionOptions {
	noAuth?: boolean;
	cookie?: RequestCookie;
	tags?: string[];
}

export interface FetchProps {
	method: "GET" | "POST" | "PUT" | "DELETE";
	body?: Record<string, any>;
}

export type HeadersContent = Headers | Pick<Headers, "Content-Type">;

export interface Headers {
	"Content-Type": string;
	Authorization: `Bearer ${string}`;
	Cookie: `session=${string}`;
}
