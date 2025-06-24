import type { UUID } from "node:crypto";
import { z } from "zod";

export const isUUID = (value: string): value is UUID => {
	return z.string().uuid().safeParse(value).success;
};
