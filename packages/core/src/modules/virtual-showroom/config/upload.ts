"use server";

import { uploadVirtualShowroomMainPageConfig } from "./pages/index/upload";

const handler = {
	index: uploadVirtualShowroomMainPageConfig,
} as { [key: string]: (payload: FormData) => void };

export const uploadVirtualShowroomConfig = async (
	_prevState: unknown,
	payload: FormData,
) => {
	const name = payload.get("page")?.toString();

	if (!name) {
		throw new Error("Page config name not found");
	}

	if (!handler[name]) {
		throw new Error("Page config uploader not found");
	}

	handler[name](payload);
};
