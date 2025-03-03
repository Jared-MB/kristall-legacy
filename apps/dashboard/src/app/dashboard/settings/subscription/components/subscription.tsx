import { getStripeAccount } from "@kristall/core/stripe/get";
import { BillingDetails } from "./billing-details";
import { CurrentSubscription } from "./current-subscription";

export async function Subscription() {
	const data = await getStripeAccount();

	if (!data || data.status === "none") return null;

	return (
		<div className="grid grid-cols-3 gap-6">
			<CurrentSubscription data={data} />
			<BillingDetails priceId={data.priceId} />
		</div>
	);
}
