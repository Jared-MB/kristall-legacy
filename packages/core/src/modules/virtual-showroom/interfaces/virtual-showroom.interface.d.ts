import type { Image } from "../../image/interfaces";
import type { Shop } from "../../shop/interfaces";

export interface VirtualShowroom {
	_id: string;
	isPublic: boolean;
	url: string;
	virtualShowroomConfig: VirtualShowroomConfig;
}

export type PanelImagesNames =
	| "cardImageOne"
	| "cardImageTwo"
	| "cardImageThree"
	| "cardImageFour";

export interface SuccessImage extends Image {
	name: PanelImagesNames;
}

export interface VirtualShowroomConfig {
	cardImageOne?: Image;
	cardImageTwo?: Image;
	cardImageThree?: Image;
	cardImageFour?: Image;
	cardTitle?: string;
	cardDescription?: string;
	customColor?: string;
	shop: Shop;
}

export type HandlerFunctionResponse =
	| {
			error: string;
			message?: undefined;
	  }
	| {
			message: string;
			error?: undefined;
	  };
