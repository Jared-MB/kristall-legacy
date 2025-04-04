"use server";

import type { ServerResponse } from "@kristall/http/interfaces";
import { revalidateTag } from "next/cache";
import { VIRTUAL_SHOWROOM_TAGS } from "../constants/virtual-showroom.tags";
import { uploadVirtualShowroomMainPageConfig } from "./pages/index/upload";

const handler = {
	index: uploadVirtualShowroomMainPageConfig,
} as { [key: string]: (payload: FormData) => Promise<ServerResponse<unknown>> };

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

	await handler[name](payload);
	revalidateTag(VIRTUAL_SHOWROOM_TAGS.CONFIG);
};
