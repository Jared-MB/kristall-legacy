import type { Image } from "../../image/interfaces";

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
	grid?: "masonry" | "grid";
	gridColumns?: number;
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
