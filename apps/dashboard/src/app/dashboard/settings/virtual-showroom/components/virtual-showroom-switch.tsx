import { getVirtualShowroom } from "@kristall/core/virtual-showroom/data";
import { ToggleVirtualShowroom } from "./toggle-virtual-showroom";

export async function VirtualShowroomSwitch() {
	const virtualShowroom = await getVirtualShowroom();

	return (
		<ToggleVirtualShowroom
			isPublic={virtualShowroom ? virtualShowroom?.isPublic : false}
		/>
	);
}
