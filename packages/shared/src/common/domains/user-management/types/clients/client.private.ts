import type { z } from "zod";

import type { UpdateClientSchema } from "../../validators/update-client-validator";
import type { UploadClientSchema } from "../../validators/upload-client-validator";

import type { Client } from "./client";

export interface PrivateClient extends Omit<Client, "isActive"> {
	isActive: boolean;
}

export enum ClientStatus {
	ACTIVE = "active",
	INACTIVE = "inactive",
}

export type UploadClient = z.infer<typeof UploadClientSchema>;
export type UpdateClient = z.infer<typeof UpdateClientSchema>;
