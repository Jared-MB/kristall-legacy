import Setting from "../components/setting";

import { CancelSubscription } from "./components/cancel-subscription";
import { Subscription } from "./components/subscription";
import { SubscriptionHistory } from "./components/subscription-history";
import { UpgradeSubscription } from "./components/upgrade-subscription";

export default function SubscriptionPage() {
	return (
		<Setting>
			<Subscription />
			<SubscriptionHistory />
			<UpgradeSubscription />
			<CancelSubscription />
		</Setting>
	);
}
