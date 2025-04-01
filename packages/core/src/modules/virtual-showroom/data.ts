"use server";

import { revalidateTag } from "next/cache";

import { SHOP_TAGS } from "../shop/constants";
import { VIRTUAL_SHOWROOM_TAGS } from "./constants/virtual-showroom.tags";
import type { VirtualShowroom } from "./interfaces";
import {
	getVirtualShowroomConfigService,
	getVirtualShowroomService,
	toggleVirtualShowroomService,
} from "./services/data";

export const getVirtualShowroomConfig = async (shopName: string) => {
	const { data } = await getVirtualShowroomConfigService(shopName);
	return data;
};

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
	revalidateTag(SHOP_TAGS.INFO);
};
