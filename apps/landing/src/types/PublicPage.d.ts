import { Image } from "./Image";

export interface PublicPage {
	_id: string;
	isPublic: boolean;
	url: string;
	bannerImage?: Image;
	title?: string;
}
