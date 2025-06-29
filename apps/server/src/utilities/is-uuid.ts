import type { UUID } from 'node:crypto';

import { z } from "zod";

export const isUUID = (id: unknown): id is UUID => {
  return z.string().uuid().safeParse(id).success;
};
