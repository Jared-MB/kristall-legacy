"use server";

import type { HandlerFunctionResponse } from "../interfaces";

import { revalidateTag } from "next/cache";
import { VIRTUAL_SHOWROOM_TAGS } from "../constants/virtual-showroom.tags";
import { uploadVirtualShowroomMainPageConfig } from "./pages/index/upload";

const handler = {
	index: uploadVirtualShowroomMainPageConfig,
} as { [key: string]: (payload: FormData) => Promise<HandlerFunctionResponse> };

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

	const response = await handler[name](payload);
	console.log(response);
	revalidateTag(VIRTUAL_SHOWROOM_TAGS.CONFIG);
};
