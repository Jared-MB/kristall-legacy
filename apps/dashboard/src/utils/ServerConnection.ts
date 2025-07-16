import type {
	FetchProps,
	HeadersContent,
	ServerConnectionOptions,
} from "@/types/server-connection";
import { logger } from "@kristall/logger";
import { getCaller } from "@kristall/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * @deprecated Use Core server connections instead
 */
export class ServerConnection {
	private url: string;
	private options: ServerConnectionOptions;

	constructor(
		url: `/${string}`,
		options: ServerConnectionOptions = { noAuth: false },
	) {
		logger.warn(
			`⚠️  ServerConnection is deprecated. Is used at: ${url}. Use @kristall/nexum package instead called from ${getCaller(
				{ showOnlyFunction: true },
			)}`,
		);
		this.url = url;
		this.options = options;
	}

	private static readonly SERVER_API = process.env.SERVER_API;

	public static createHeaders(token?: string | undefined): HeadersContent {
		if (!token) {
			return {
				"Content-Type": "application/json",
			};
		}
		return {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
			Cookie: `session=${token}`,
		};
	}

	private async getSessionCookie() {
		if (this.options.noAuth) {
			return undefined;
		}
		// IF TESTING, AUTH FROM ENV VARIABLES
		if (process.env.NODE_ENV === "test") {
			try {
				const response = await fetch(
					`${ServerConnection.SERVER_API}/auth/login`,
					{
						method: "POST",
						body: JSON.stringify({
							username: process.env.LOGIN_USERNAME,
							password: process.env.LOGIN_PASSWORD,
						}),
						headers: {
							"Content-Type": "application/json",
						},
					},
				);
				const result = await response.json();
				return result.data.access_token;
			} catch (error) {
				console.error(error);
				return null;
			}
		}
		const session = (await cookies()).get("session");
		if (!session?.value) {
			redirect("/login");
		}
		return session.value;
	}

	private async getHeaders() {
		const cookieSession = await this.getSessionCookie();
		return ServerConnection.createHeaders(cookieSession);
	}

	public async makeRequest<T>(headers: HeadersContent, options: FetchProps) {
		const api = ServerConnection.SERVER_API;
		const response = await fetch(`${api}${this.url}`, {
			method: options.method,
			headers: {
				...headers,
			},
			body: options.body ? JSON.stringify(options.body) : undefined,
			next: {
				tags: this.options.tags ?? [],
			},
		});

		if (!response.ok) {
			console.log({ response });
			throw new Error(
				JSON.stringify({
					status: response.status,
					statusText: response.statusText,
				}),
			);
		}

		try {
			const json = await response.json();
			return json.data as T;
		} catch (error) {
			return {} as T;
		}
	}

	public async get<T>() {
		const headers = await this.getHeaders();

		return await this.makeRequest<T>(headers, {
			method: "GET",
		});
	}

	public async post<T>(body: Record<string, any>) {
		const headers = await this.getHeaders();

		return await this.makeRequest<T>(headers, {
			method: "POST",
			body,
		});
	}

	public async put<T>(body: Record<string, any>) {
		const headers = await this.getHeaders();

		return await this.makeRequest<T>(headers, {
			method: "PUT",
			body,
		});
	}

	public async delete<T>() {
		const headers = await this.getHeaders();

		return await this.makeRequest<T>(headers, {
			method: "DELETE",
		});
	}
}

export class Adapter {}
