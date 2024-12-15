"use server";

import { POST } from "@kristall/http";

export const uploadCategoryService = async (name: string): Promise<void> => {
	await POST("/categories", { name });
};
