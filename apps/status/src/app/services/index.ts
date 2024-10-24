import { api } from "./api.service";
import { dashboard } from "./dashboard.service";
import { virtualShowroom } from "./virtual-showroom.service";

export const checkServices = async () =>
	await Promise.all([dashboard(), api(), virtualShowroom()]);

export { api, dashboard, virtualShowroom };
