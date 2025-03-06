import { isFeatureEnabled } from "@kristall/core/utils";
import SettingsLink from "../components/settings-link";

import {
	AVAILABLE_SINCE,
	AVAILABLE_SINCE_MINOR,
} from "../../virtual-showroom/page";

export async function VirtualShowroomLink() {
	const isEnabled = await isFeatureEnabled(
		AVAILABLE_SINCE,
		AVAILABLE_SINCE_MINOR,
	);

	return (
		<SettingsLink
			disabled={!isEnabled}
			href="/dashboard/settings/virtual-showroom"
		>
			Virtual Showroom
		</SettingsLink>
	);
}
