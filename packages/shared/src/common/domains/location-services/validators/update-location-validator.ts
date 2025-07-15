import { z } from "zod";

import { UploadLocationSchema } from "./upload-location-validator";

export const UpdateLocationSchema = UploadLocationSchema.extend({
	_id: z.string().uuid(),
});
