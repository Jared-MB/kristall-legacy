import type { Image } from "../../image/interfaces";

export interface VirtualShowroom {
	_id: string;
	isPublic: boolean;
	url: string;
	title?: string;
	bannerImage?: Image;
}
