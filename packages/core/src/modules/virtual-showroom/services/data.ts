"use server";

import { GET, PUT } from "@kristall/http";
import { VIRTUAL_SHOWROOM_TAGS } from "../constants/virtual-showroom.tags";
import type { VirtualShowroom } from "../interfaces";

export const getVirtualShowroomService = async () => {
	return await GET<VirtualShowroom>("/virtual-showroom", {
		tags: [VIRTUAL_SHOWROOM_TAGS.DATA],
	});
};

export const toggleVirtualShowroomService = async (isPublic: boolean) => {
	return await PUT("/virtual-showroom/toggle", {
		isPublic,
	});
};
