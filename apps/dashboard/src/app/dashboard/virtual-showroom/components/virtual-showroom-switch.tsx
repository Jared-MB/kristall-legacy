import { Switch } from "@/components/ui";
import { isFeatureEnabled } from "@kristall/client/utils/version";
import { getVirtualShowroom } from "@kristall/core/virtual-showroom/data";
import { AVAILABLE_SINCE, AVAILABLE_SINCE_MINOR } from "../page";
import { ToggleVirtualShowroom } from "./toggle-virtual-showroom";

export async function VirtualShowroomSwitch() {
	const virtualShowroom = await getVirtualShowroom();

	const isEnabled = await isFeatureEnabled(
		AVAILABLE_SINCE,
		AVAILABLE_SINCE_MINOR,
	);

	if (!isEnabled) {
		return <Switch disabled />;
	}

	return (
		<ToggleVirtualShowroom
			isPublic={virtualShowroom ? virtualShowroom?.isPublic : false}
		/>
	);
}
