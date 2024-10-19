/**
 * @deprecated Use `core` interfaces instead
 */
export interface ShopData {
	_id: string;
	username: string;
	logo: string;
	shopName: string;
	showroom: {
		isPublic: boolean;
		url: string;
	};
}
