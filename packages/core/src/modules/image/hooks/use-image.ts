import { type ChangeEvent, useState } from "react";
import { HAS_IMAGE_CHANGED } from "../constants/use-image";

export const useImage = (url?: string) => {
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [previewImage, setPreviewImage] = useState<string | null>(url || null);

	/**
	 * * NOTE: Not using true/false because value its recovered from an input
	 * * and true/false would be strings
	 *
	 * ? Maybe we can use a checkbox instead of a hidden input
	 */
	const [hasImageChanged, setHasImageChanged] = useState<HAS_IMAGE_CHANGED>(
		HAS_IMAGE_CHANGED.NO,
	);

	const setImage = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		setImageFile(file || null);
		setHasImageChanged(HAS_IMAGE_CHANGED.YES);

		if (!file) {
			setPreviewImage(null);
			setImageFile(null);
			return;
		}

		const reader = new FileReader();
		reader.onloadend = () => {
			setPreviewImage(reader.result as string);
		};
		reader.readAsDataURL(file);
	};

	return {
		imageFile,
		previewImage,
		hasImageChanged,
		setImage,
	};
};
