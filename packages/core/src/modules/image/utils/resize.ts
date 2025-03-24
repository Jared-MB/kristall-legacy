import sharp from "sharp";

export const toAvif = async (image: File): Promise<Buffer> => {
	const buffer = await image.arrayBuffer();

	const resizedImage = await sharp(buffer)
		.resize({
			width: 500,
			fit: "inside",
			withoutEnlargement: true,
		})
		.avif({
			quality: 50,
			effort: 4,
		})
		.toBuffer();

	return resizedImage;
};
