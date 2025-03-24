import type { UUID } from "node:crypto";

export interface Image {
	_id: UUID;
	url: string;
}

export interface UploadImageData {
	image: File;
	imageId?: UUID;
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
