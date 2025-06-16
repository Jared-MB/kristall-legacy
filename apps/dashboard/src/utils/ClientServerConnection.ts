"use client";

import type {
	FetchProps,
	HeadersContent,
	ServerConnectionOptions,
} from "@/types/server-connection";
import { isDev } from "@kristall/core/utils";
import type { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export class ClientServerConnection {
	private url: string;
	private token: RequestCookie | undefined;
	private options: ServerConnectionOptions;

	constructor(
		url: `/${string}`,
		token: RequestCookie | undefined,
		options: ServerConnectionOptions = { noAuth: false },
	) {
		this.url = url;
		this.options = options;
		this.token = token;
	}

	private static readonly SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;

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

	private getSessionCookie() {
		return this.token?.value;
	}

	private getHeaders() {
		const cookieSession = this.getSessionCookie();
		return ClientServerConnection.createHeaders(cookieSession);
	}

	public async makeRequest<T>(headers: HeadersContent, options: FetchProps) {
		isDev &&
			console.warn(
				"⚠️ ClientServerConnection is deprecated, use @kristall/http instead, is used at ",
				this.url,
			);

		const api = ClientServerConnection.SERVER_API;
		const response = await fetch(`${api}${this.url}`, {
			method: options.method,
			headers: {
				...headers,
			},
			body: options.body ? JSON.stringify(options.body) : undefined,
		});

		if (!response.ok) {
			throw new Error(
				JSON.stringify({
					status: response.status,
					statusText: response.statusText,
				}),
			);
		}

		const json = await response.json();

		return json.data as T;
	}

	public async get<T>() {
		const headers = this.getHeaders();

		return await this.makeRequest<T>(headers, {
			method: "GET",
		});
	}

	public async post<T>(body: Record<string, any>) {
		const headers = this.getHeaders();

		return await this.makeRequest<T>(headers, {
			method: "POST",
			body,
		});
	}

	public async put<T>(body: Record<string, any>) {
		const headers = this.getHeaders();

		return await this.makeRequest<T>(headers, {
			method: "PUT",
			body,
		});
	}

	public async delete<T>() {
		const headers = this.getHeaders();

		return await this.makeRequest<T>(headers, {
			method: "DELETE",
		});
	}
}
