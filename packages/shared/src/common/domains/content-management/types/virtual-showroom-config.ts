import type { Image } from "./images";

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
