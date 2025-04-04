import type {
	SuccessImage,
	VirtualShowroomConfig as VSConfig,
} from "../interfaces";

type ConfigPanelImages = Pick<
	VSConfig,
	"cardImageOne" | "cardImageTwo" | "cardImageThree" | "cardImageFour"
>;

export class VirtualShowroomConfig {
	private images: SuccessImage[];

	constructor() {
		this.images = [];
	}

	private transformImages(images: SuccessImage[]): ConfigPanelImages {
		const configPanelImages: ConfigPanelImages = {};

		for (const image of images) {
			const { name } = image;
			configPanelImages[name] = image;
		}

		return configPanelImages;
	}

	public setPanelImages(images: SuccessImage[]): VirtualShowroomConfig {
		this.images = images;
		return this;
	}

	public build(): Omit<VSConfig, "shop"> {
		const images = this.transformImages(this.images);

		return {
			...images,
		};
	}
}
