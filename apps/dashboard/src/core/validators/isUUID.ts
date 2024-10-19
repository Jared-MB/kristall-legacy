import { z } from "zod";

export const isUUID = z.string().uuid();
