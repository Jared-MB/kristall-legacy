import type { UUID } from "node:crypto";

export interface Image {
	_id: UUID;
	url: string;
}

export interface UploadImageConfig {
	shopName: string;
	shopId: string;
}

export interface UploadImageServiceParams {
	image: File;
	imageId: UUID;
	shopName: string;
	shopId: string;
	safe?: boolean;
}
