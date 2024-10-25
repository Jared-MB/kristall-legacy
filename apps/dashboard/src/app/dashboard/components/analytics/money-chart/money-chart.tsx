import type { Analytics } from "@kristall/core/modules/analytics/interfaces";

import { Card, CardBody } from "@/components/ui";
import RawMoneyChart from "./raw-money-chart";

export default function MoneyChart({ analytics }: { analytics: Analytics }) {
	return (
		<Card>
			<CardBody>
				<RawMoneyChart analytics={analytics} />
			</CardBody>
		</Card>
	);
}
