import type { Image } from "../../image/interfaces";

export interface VirtualShowroom {
	_id: string;
	isPublic: boolean;
	url: string;
	virtualShowroomConfig: VirtualShowroomConfig;
}

export interface VirtualShowroomConfig {
	cardImageOne?: Image;
	cardImageTwo?: Image;
	cardImageThree?: Image;
	cardImageFour?: Image;
	cardTitle?: string;
	cardDescription?: string;
}
