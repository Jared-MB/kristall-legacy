import type { Image } from "@/core/interfaces/entities";
import type { AddProduct } from "../_validators";

export interface UploadProductRaw extends AddProduct {
	image: File;
}

export interface UploadProduct extends AddProduct {
	image: Image | null;
}
