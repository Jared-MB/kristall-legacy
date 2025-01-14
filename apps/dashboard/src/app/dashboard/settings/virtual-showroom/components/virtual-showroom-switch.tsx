import { getVirtualShowroom } from "@kristall/core/virtual-showroom/data";
import { ToggleVirtualShowroom } from "./toggle-virtual-showroom";

export async function VirtualShowroomSwitch() {
	const { isPublic } = await getVirtualShowroom();

	return <ToggleVirtualShowroom isPublic={isPublic} />;
}
