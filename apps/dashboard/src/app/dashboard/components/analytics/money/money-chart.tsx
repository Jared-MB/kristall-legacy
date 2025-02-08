import type { Analytics } from "@kristall/core/interfaces/analytics";

import { Card, CardBody } from "@kristall/ui/card";
import { RawMoneyChart } from "./raw-money-chart";

export function MoneyChart({ analytics }: { analytics: Analytics }) {
	return (
		<Card>
			<CardBody>
				<RawMoneyChart analytics={analytics} />
			</CardBody>
		</Card>
	);
}
