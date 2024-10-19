import { Suspense } from "react";
import Analytics from "./components/analytics";
import AnalyticsSkeleton from "./components/analytics/skeleton";
import OrdersSection from "./components/orders-section";

export default function DashboardPage() {
	return (
		<main className="p-8 h-layout overflow-y-auto">
			<Suspense fallback={<AnalyticsSkeleton />}>
				<Analytics />
			</Suspense>
			<OrdersSection />
		</main>
	);
}
