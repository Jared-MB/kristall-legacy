import type { ClientStatus } from "@kristall/shared/domains/user-management/types";

export const CLIENTS_TAGS = {
	ALL: (status: ClientStatus) => `clients:all:${status}`,
	NAME: (name: string) => `clients:name:${name}`,
};
