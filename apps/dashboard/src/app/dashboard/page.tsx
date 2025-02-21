import { Suspense } from "react";
import {
	AnalyticsChart,
	AnalyticsChartSkeleton,
} from "./components/analytics/analytics-chart";
import { DashboardOrders } from "./components/orders";

export default function DashboardPage() {
	return (
		<main className="p-8 h-layout overflow-y-auto">
			<Suspense fallback={<AnalyticsChartSkeleton />}>
				<AnalyticsChart />
			</Suspense>
			<section className="pt-8">
				<h3 className="text-2xl mb-4">Últimos pedidos</h3>
				<Suspense fallback={null}>
					<DashboardOrders />
				</Suspense>
			</section>
		</main>
	);
}
