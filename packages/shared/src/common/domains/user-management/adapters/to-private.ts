import type { Client, PrivateClient } from "../types";

export const adaptToPrivateClient = (client: Client): PrivateClient => {
	return {
		_id: client._id,
		name: client.name,
		purchases: client.purchases,
		isActive: Boolean(client.isActive),
	};
};
