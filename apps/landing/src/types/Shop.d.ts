import type { Image, PublicPage } from ".";

export interface Shop {
	_id: string;
	name: string;
	image: Image;
	publicPage: PublicPage;
}
