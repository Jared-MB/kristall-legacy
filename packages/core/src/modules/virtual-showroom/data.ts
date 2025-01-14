"use server";

import { revalidateTag } from "next/cache";

import { VIRTUAL_SHOWROOM_TAGS } from "./constants/virtual-showroom.tags";
import type { VirtualShowroom } from "./interfaces";
import {
	getVirtualShowroomService,
	toggleVirtualShowroomService,
} from "./services/data";

export const getVirtualShowroom = async (): Promise<VirtualShowroom | null> => {
	const { data } = await getVirtualShowroomService();

	if (!data) {
		return null;
	}

	return data;
};

export const toggleVirtualShowroom = async (isPublic: boolean) => {
	await toggleVirtualShowroomService(isPublic);
	revalidateTag(VIRTUAL_SHOWROOM_TAGS.DATA);
};
