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
	private title: string | null = null;
	private description: string | null = null;
	private customColor: string | null = null;

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

	public setPanelTitle(title: string): VirtualShowroomConfig {
		this.title = title;
		return this;
	}

	public setPanelDescription(description: string): VirtualShowroomConfig {
		this.description = description;
		return this;
	}

	public setCustomColor(color: string): VirtualShowroomConfig {
		this.customColor = color;
		return this;
	}

	public build(): Omit<VSConfig, "shop"> {
		const images = this.transformImages(this.images);

		let config: Omit<VSConfig, "shop"> = {
			...images,
		};

		if (this.title) {
			config = {
				...config,
				cardTitle: this.title,
			};
		}

		if (this.description) {
			config = {
				...config,
				cardDescription: this.description,
			};
		}

		if (this.customColor) {
			config = {
				...config,
				customColor: this.customColor,
			};
		}

		return config;
	}
}
