"use server";

import { NEXT_TAGS } from "@/constants/tags";
import type { User } from "@/types/user";
import { ShopLogoConnection, UsersConnection } from "@/utils/connections";
import { revalidateTag } from "next/cache";

/**
 * @deprecated
 */
export const getUsers = async () => await UsersConnection.get<User[]>();

/**
 * @deprecated
 */
export const setShopImage = async (url: string, prevState?: string) => {
	if (prevState) {
		revalidateTag("shop");
		return;
	}
	const _id = url.split("/").pop();
	const image = {
		url,
		_id,
	};
	const savedImage = await ShopLogoConnection.put({
		image,
	});

	if (savedImage) {
		revalidateTag(NEXT_TAGS.GET_SHOP);
	}
};
