import type { z } from "zod";

import type { UpdateClientSchema } from "../validators/update-client-validator";
import type { UploadClientSchema } from "../validators/upload-client-validator";

import type { Client } from "./client";

export type PrivateClient = Client;
export type UploadClient = z.infer<typeof UploadClientSchema>;
export type UpdateClient = z.infer<typeof UpdateClientSchema>;
