import {
	afterAll,
	beforeAll,
	beforeEach,
	describe,
	expect,
	test,
	vi,
} from "vitest";

import { randomUUID } from "node:crypto";

import { shop } from "../../shop";
import { imageService } from "../services";
import { images } from "./index";

vi.mock("../services", () => {
	return {
		imageService: {
			uploadImageService: vi.fn(),
			deleteImageService: vi.fn(),
		},
	};
});

describe("Upload image", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test("Should upload a image successfully", async () => {
		const imageId = randomUUID();

		vi.mocked(imageService.uploadImageService).mockResolvedValue({
			_id: imageId,
			url: "https://kristall.io/images/product.png",
		});

		const data = new FormData();
		data.append("image", new File([], "image.png"));
		data.append("imageId", imageId);

		const image = await images.uploadImage(data);
		expect(image).not.toBeNull();
		expect(image?.url).toContain("http");
		expect(image?._id).toBe(imageId);
	});

	test("Should throw an error if image is not a file", async () => {
		const data = new FormData();
		data.append("image", "not a file");
		data.append("imageId", randomUUID());

		await expect(images.uploadImage(data)).rejects.toThrowError();
	});

	test("Should throw an error if image is not provided", async () => {
		const data = new FormData();
		data.append("imageId", randomUUID());

		await expect(images.uploadImage(data)).rejects.toThrowError();
	});
});

vi.mock("../../shop", () => {
	return {
		shop: {
			getShopData: vi.fn(),
		},
	};
});

describe("Delete image", () => {
	beforeAll(() => {
		vi.mocked(shop.getShopData).mockResolvedValue({
			_id: randomUUID(),
			shopName: "Test Shop",
			logo: "https://kristall.io/images/logo.png",
			showroom: {
				isPublic: true,
				url: "https://kristall.io/images/showroom.png",
			},
			username: "Test User",
		});
	});

	beforeEach(() => {
		vi.clearAllMocks();
	});

	test("Should delete an image successfully", async () => {
		const imageId = randomUUID();
		await expect(images.deleteImage(imageId)).resolves.toBeUndefined();
	});

	test("Should throw an error something went wrong", async () => {
		vi.mocked(imageService.deleteImageService).mockRejectedValue(
			new Error("Something went wrong"),
		);

		const imageId = randomUUID();
		await expect(images.deleteImage(imageId)).rejects.toThrowError();
	});

	afterAll(() => {
		console.log(
			"⚠️ WE DON'T CHECK WHAT HAPPEN WHEN shop.getShopData THROWS AN ERROR ON IMAGE ADAPTER",
		);
		vi.clearAllMocks();
	});
});
