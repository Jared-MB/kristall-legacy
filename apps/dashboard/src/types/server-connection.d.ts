import type { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

/**
 * @deprecated
 */
export interface ServerConnectionOptions {
	noAuth?: boolean;
	cookie?: RequestCookie;
	tags?: string[];
}

/**
 * @deprecated
 */
export interface FetchProps {
	method: "GET" | "POST" | "PUT" | "DELETE";
	body?: Record<string, any>;
}

/**
 * @deprecated
 */
export type HeadersContent = Headers | Pick<Headers, "Content-Type">;

/**
 * @deprecated
 */
export interface Headers {
	"Content-Type": string;
	Authorization: `Bearer ${string}`;
	Cookie: `session=${string}`;
}
