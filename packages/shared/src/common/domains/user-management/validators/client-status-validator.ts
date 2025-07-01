import { z } from "zod";
import { ClientStatus } from "../types";

export const ClientStatusValidator = z.enum([
	ClientStatus.ACTIVE,
	ClientStatus.INACTIVE,
]);
