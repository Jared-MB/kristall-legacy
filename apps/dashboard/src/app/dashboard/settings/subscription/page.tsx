import Setting from "../components/setting";

import { CancelSubscription } from "./components/cancel-subscription";
import { CurrentSubscription } from "./components/current-subscription";
import { UpgradeSubscription } from "./components/upgrade-subscription";

export default function SubscriptionPage() {
	return (
		<Setting>
			<CurrentSubscription />
			<UpgradeSubscription />
			<CancelSubscription />
		</Setting>
	);
}
