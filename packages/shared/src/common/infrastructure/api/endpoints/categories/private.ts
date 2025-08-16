import type { Url } from "../../../../types/url";

export const CATEGORIES_PRIVATE_ENDPOINTS = {
	DETAILS: "/categories/details",
	UPLOAD: "/categories",
	UPDATE: (id: string) => `/categories/${id}` as Url,
	DELETE: (id: string) => `/categories/${id}` as Url,
} as const;
