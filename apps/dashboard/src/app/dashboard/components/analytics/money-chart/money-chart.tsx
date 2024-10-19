import { Card, CardBody } from "@/components/ui";
import type { Analytics } from "../_interfaces";
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
