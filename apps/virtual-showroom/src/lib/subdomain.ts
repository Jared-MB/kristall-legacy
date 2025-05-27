export const parseSubdomain = (host: string) => {
	const rawShopName = host.split(".")[0];
	const parsedName = rawShopName
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
	const shopName = parsedName.join(" ");
	return [shopName, rawShopName];
};
