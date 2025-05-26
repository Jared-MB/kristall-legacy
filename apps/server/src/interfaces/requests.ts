import type { Request } from "express";
import type { RequestUser } from "src/entities";

export interface AuthRequest extends Request {
    user: RequestUser;
}