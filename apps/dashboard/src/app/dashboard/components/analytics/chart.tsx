import type { Analytics } from "@kristall/core/interfaces/analytics";

import {
	ClipboardList,
	LineChart,
	TrendingDown,
	TrendingUp,
} from "lucide-react";

import { addDay } from "@formkit/tempo";
import { Suspense } from "react";

import { getAnalytics } from "@kristall/client/services/analytics-tracking/use-cases/private/get-analytics";
import { getPendingOrders } from "@kristall/core/orders/get";

import { Card, CardBody } from "@kristall/ui/card";
import { Skeleton } from "@kristall/ui/skeleton";

import { MoneyChart } from "./money/money-chart";
import {
	ProductsChart,
	ProductsChartSkeleton,
} from "./products/products-chart";

import { InfoCard } from "./info-card";
import { VersionCard } from "./version-card";

export async function AnalyticsChart() {
	const [analyticsInfo, pendingOrders] = await Promise.all([
		getAnalytics(),
		getPendingOrders(),
	]);

	const thisMonth = new Date().getMonth();

	if (!analyticsInfo) {
		return null;
	}

	const earningsOfTheMonth = analyticsInfo.earningsByDay.filter(
		(day) => new Date(day.date).getMonth() === thisMonth,
	);

	const earnings = earningsOfTheMonth.reduce(
		(acc, day) => acc + Number(day.earnings),
		0,
	);
	const cost = earningsOfTheMonth.reduce(
		(acc, day) => acc + Number(day.cost),
		0,
	);

	const revenue = earnings - cost;

	return (
		<div className="flex flex-col gap-y-4">
			<div className="flex flex-row gap-x-4">
				<VersionCard />
				<InfoCard title="Ganancias totales" icon={<LineChart />}>
					${revenue}
				</InfoCard>
				<InfoCard title="Ventas totales" icon={<TrendingUp />}>
					${earnings}
				</InfoCard>
				<InfoCard title="Gastos totales" icon={<TrendingDown />}>
					${cost}
				</InfoCard>
				<InfoCard title="Ordenes pendientes" icon={<ClipboardList />}>
					{pendingOrders ?? 0}
				</InfoCard>
			</div>
			<div className="grid grid-cols-[auto_1fr] gap-x-4">
				<MoneyChart analytics={analyticsInfo} />
				<Suspense fallback={<ProductsChartSkeleton />}>
					<ProductsChart />
				</Suspense>
			</div>
		</div>
	);
}

const ANALYTICS_SKELETON: Analytics = {
	earningsByDay: [
		{
			cost: 0,
			date: addDay(new Date().toISOString(), -2).toDateString(),
			earnings: 0,
		},
		{
			cost: 0,
			date: addDay(new Date().toISOString(), -1).toDateString(),
			earnings: 0,
		},
		{
			cost: 0,
			date: new Date().toDateString(),
			earnings: 0,
		},
		{
			cost: 0,
			date: addDay(new Date().toISOString(), 1).toDateString(),
			earnings: 0,
		},
		{
			cost: 0,
			date: addDay(new Date().toISOString(), 2).toDateString(),
			earnings: 0,
		},
	],
};

export function AnalyticsChartSkeleton() {
	return (
		<div className="flex flex-col gap-y-4">
			<div className="grid grid-cols-4 gap-x-4">
				<Card>
					<CardBody className="p-4">
						<h4 className="text-base text-zinc-400 flex items-center justify-start gap-x-2">
							Ganancias totales
							<LineChart />
						</h4>
						<span className="text-2xl flex flex-row gap-x-1 items-center">
							$ <Skeleton className="w-16 h-5" />
						</span>
					</CardBody>
				</Card>
				<Card>
					<CardBody className="p-4">
						<h4 className="text-base text-zinc-400 flex items-center justify-start gap-x-2">
							Ventas totales
							<TrendingUp />
						</h4>
						<span className="text-2xl flex flex-row gap-x-1 items-center">
							$ <Skeleton className="w-16 h-5" />
						</span>
					</CardBody>
				</Card>
				<Card>
					<CardBody className="p-4">
						<h4 className="text-base text-zinc-400 flex items-center justify-start gap-x-2">
							Gastos totales
							<TrendingDown />
						</h4>
						<span className="text-2xl flex flex-row gap-x-1 items-center">
							$ <Skeleton className="w-16 h-5" />
						</span>
					</CardBody>
				</Card>
				<Card>
					<CardBody className="p-4">
						<h4 className="text-base text-zinc-400 flex items-center justify-start gap-x-2">
							Ordenes pendientes
							<ClipboardList />
						</h4>
						<span className="text-2xl flex flex-row gap-x-1 items-center">
							<Skeleton className="w-16 h-5" />
						</span>
					</CardBody>
				</Card>
			</div>
			<div className="grid grid-cols-[auto_1fr] gap-x-4">
				<MoneyChart analytics={ANALYTICS_SKELETON} />
				<ProductsChartSkeleton />
			</div>
		</div>
	);
}
