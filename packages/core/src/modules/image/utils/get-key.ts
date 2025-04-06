interface GetKeyParams {
	id: string;
	shopId?: string;
	shopName?: string;
	isDev?: boolean;
}

export const getKey = ({
	id,
	shopId,
	shopName,
	isDev,
}: GetKeyParams): string => {
	let key = id;

	if (shopId && shopName) {
		const trimmedShopName = shopName.replaceAll(" ", "");
		key = `${shopId}-${trimmedShopName}/${id}`;
	}

	if (isDev) {
		key = `dev/${key}`;
	}

	return key;
};

export const getKeyFromUrl = (url: string): string | undefined => {
	const key = url.split("kristall.app").pop()?.slice(1);
	return key;
};
