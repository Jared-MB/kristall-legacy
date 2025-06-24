import { isUUID } from "../../../utils/is-uuid";
import type { PrivateShop, Shop } from "../types";

export const adaptToPrivateShop = (shop: Shop): PrivateShop => {
	if (!isUUID(shop._id)) {
		throw new Error("Invalid shop ID");
	}

	return {
		_id: shop._id,
		shopName: shop.shopName,
		username: shop.username,
		logo: shop.logo,
		showroom: {
			isPublic: shop.showroom.isPublic,
			url: shop.showroom.url,
		},
	};
};
