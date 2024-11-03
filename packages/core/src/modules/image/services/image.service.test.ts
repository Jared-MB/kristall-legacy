import { describe, expect, test, vi } from "vitest";

import { randomUUID } from "node:crypto";
import { deleteImageService, uploadImageService } from "./image.service";
import { r2 } from "./r2.service";

vi.mock("./r2.service", () => ({
	r2: {
		send: vi.fn(),
	},
}));

vi.mock("@aws-sdk/client-s3", () => {
	return {
		DeleteObjectCommand: vi.fn(),
		PutObjectCommand: vi.fn(),
	};
});

describe("Upload image service", () => {
	test("Should upload an image successfully", async () => {
		const imageId = randomUUID();

		const image = await uploadImageService({
			image: new File([new ArrayBuffer(1)], "image.png", {}),
			imageId: imageId,
			shopId: randomUUID(),
			shopName: "Test Shop",
		});

		expect(image).not.toBeNull();
		expect(image?.url).toContain("http");
		expect(image?._id).toBe(imageId);
	});

	test("Should return null if image size is 0", async () => {
		const imageId = randomUUID();

		const image = await uploadImageService({
			image: new File([], "image.png", {}),
			imageId: imageId,
			shopId: randomUUID(),
			shopName: "Test Shop",
		});

		expect(image).toBeNull();
	});

	test("Should throw an error if the image size is greater than 500KB", async () => {
		const imageId = randomUUID();

		const image = uploadImageService({
			image: new File([new ArrayBuffer(500001)], "image.png", {}),
			imageId: imageId,
			shopId: randomUUID(),
			shopName: "Test Shop",
		});

		await expect(image).rejects.toThrowError(
			"La imagen no puede pesar más de 500KB",
		);
	});
});

describe("Delete image service", () => {
	test("Should delete an image successfully", async () => {
		const imageId = randomUUID();
		await expect(
			deleteImageService(imageId, {
				shopId: randomUUID(),
				shopName: "Test Shop",
			}),
		).resolves.toBeUndefined();
	});

	test("Should throw an error something went wrong", async () => {
		vi.mocked(r2.send).mockRejectedValue(new Error("Something went wrong"));

		const imageId = randomUUID();
		await expect(
			deleteImageService(imageId, {
				shopId: randomUUID(),
				shopName: "Test Shop",
			}),
		).rejects.toThrowError();
	});
});
