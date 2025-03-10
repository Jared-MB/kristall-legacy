import Routes from "@/constants/routes";
import { AppWindowMac } from "lucide-react";
import Setting from "../components/setting";
import { SettingChange } from "../components/setting-change";

export default function VirtualShowroomPageDeprecated() {
	return (
		<Setting>
			<SettingChange
				title="Virtual Showroom"
				redirectTo={Routes.VIRTUAL_SHOWROOM}
			>
				<AppWindowMac className="text-purple-500 h-12 w-12" />
			</SettingChange>
		</Setting>
	);
}
