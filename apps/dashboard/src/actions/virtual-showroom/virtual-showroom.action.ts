"use server";

import { NEXT_TAGS } from "@/constants/tags";
import { revalidateTag } from "next/cache";
import { GET, PUT } from "../server-connection";

const BASE_PATH = "/virtual-showroom";

interface Shop {
	_id: string;
	name: string;
	publicPage: VirtualShowroom;
}

export interface VirtualShowroom {
	_id: string;
	isPublic: boolean;
	url: string;
	title?: string;
}

/**
 * @deprecated
 */
export const getVirtualShowroom = async (): Promise<
	VirtualShowroom | undefined
> => {
	const shop = await GET<Shop | null>(BASE_PATH, {
		tags: [NEXT_TAGS.GET_VIRTUAL_SHOWROOM],
	});
	return shop?.publicPage;
};
/**
 * @deprecated
 */
export const toggleVirtualShowroom = async (isPublic: boolean) => {
	await PUT(
		`${BASE_PATH}/toggle`,
		{ isPublic },
		{
			toJSON: false,
		},
	);
	revalidateTag(NEXT_TAGS.GET_VIRTUAL_SHOWROOM);
};
