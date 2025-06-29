import type { UUID } from "node:crypto";
import { z } from "zod";

export const isUUID = (value: unknown): value is UUID => {
	return z.string().uuid().safeParse(value).success;
};
