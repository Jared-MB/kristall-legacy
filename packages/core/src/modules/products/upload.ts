"use server";

import type { Image } from "../image/interfaces";
import type { BatchToAdd, LocationToAdd } from "../locations/interfaces";
import type {
	AddProduct,
	UploadProductRaw,
	UploadProductResponse,
} from "./interfaces";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { FORM_MESSAGE_TYPES } from "@kristall/core/forms";
import { ZodErrorExtractor } from "@kristall/core/utils/zod-error-extractor";
import { images } from "../image";
import { PRODUCTS_TAGS } from "./constants";
import { uploadProductService } from "./services/products.service";
import { AddProductSchema } from "./validators";

export const uploadProduct = async (
	locations: LocationToAdd[],
	batches: BatchToAdd[],
	isEnabled: boolean,
	isCreatingMany: boolean,
	redirectTo: `/${string}` | undefined,
	_prevState: unknown,
	data: FormData,
): Promise<UploadProductResponse> => {
	const rawData = Object.fromEntries(data.entries());

	// Join the locations/batches with the product data
	const product = {
		...(rawData as any),
		locations,
		batches,
		batchEnabled: isEnabled,
	} as UploadProductRaw;

	const parsedData = AddProductSchema.safeParse(product);

	const fields = new ZodErrorExtractor({ ...product }, parsedData.error);
	const fieldNames: (keyof AddProduct)[] = [
		"_id",
		"name",
		"code",
		"price",
		"cost",
		"category",
		"locations",
		"batches",
		"batchEnabled",
	];

	const inputs = fields.extractErrorsForFields(fieldNames);
	const inputsWithImage = {
		...inputs,
		image: {
			value: product.image,
			message: "",
		},
	};

	if (!parsedData.success) {
		console.log(inputsWithImage);

		return {
			fields: inputsWithImage,
		};
	}

	let image: Image | null = null;
	try {
		const payload = new FormData();
		payload.append("image", product.image);
		image = await images.uploadImage(payload);
	} catch (err) {
		if (err instanceof Error) {
			return {
				fields: inputsWithImage,
				message: {
					type: FORM_MESSAGE_TYPES.IMAGE_SIZE_ERROR,
					value: err.message,
				},
			};
		}
		return {
			fields: inputsWithImage,
			message: {
				type: FORM_MESSAGE_TYPES.IMAGE_ERROR,
				value: "Error al subir la imagen",
			},
		};
	}

	const { status } = await uploadProductService(parsedData.data, image);
	if (status >= 400) {
		image && (await images.deleteImage(image._id));
		return {
			fields: inputsWithImage,
			message: {
				type: FORM_MESSAGE_TYPES.INTERNAL_ERROR,
				value: "Error al subir el producto",
			},
		};
	}

	revalidateTag(PRODUCTS_TAGS.PAGINATED);
	if (!isCreatingMany) {
		redirect(redirectTo ?? "/dashboard/inventory");
	}

	return {
		fields: {
			...fields.extractEmptyValuesForFields(fieldNames),
			image: {
				value: new File([], "undefined"),
				message: "",
			},
		},
		message: {
			type: FORM_MESSAGE_TYPES.SUCCESS,
			value: "Producto creado correctamente",
		},
	};
};
