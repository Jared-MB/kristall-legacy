import { StripePlans } from "src/entities";

export interface Context {
    shopId: string;
    permissions: string;
    plan: StripePlans;
}