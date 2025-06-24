import type { VirtualShowroomConfig } from "./virtual-showroom-config";

export interface VirtualShowroom {
	_id: string;
	isPublic: boolean;
	url: string;
	virtualShowroomConfig: VirtualShowroomConfig;
}
