import {
	ClipboardList,
	LineChart,
	Sparkle,
	TrendingDown,
	TrendingUp,
} from "lucide-react";

import { analytics } from "@kristall/core/modules/analytics";
import { orders } from "@kristall/core/modules/orders";

import { Card, CardBody } from "@kristall/ui/card";

import { VERSIONS } from "@kristall/core/constants";
import Link from "next/link";
import type React from "react";
import MoneyChart from "./money-chart";
import ProductsChart from "./products-chart";

import AnimatedShinyText from "@/components/ui/animated-shiny-text";
import { BorderBeam } from "@/components/ui/border-beam";
import { cn } from "@/core/utils";
import { diffDays } from "@formkit/tempo";
import { Suspense } from "react";
import ProductsChartSkeleton from "./products-chart/skeleton";

export default async function Analytics() {
	const [analyticsInfo, pendingOrders] = await Promise.all([
		analytics.getAnalytics(),
		orders.getPendingOrders(),
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

	const daysAfterNewVersion = diffDays(new Date(), VERSIONS[0].date);

	return (
		<div className="flex flex-col gap-y-4">
			<div
				className={cn(
					"grid grid-cols-4 gap-x-4",
					daysAfterNewVersion < 7 && "grid-cols-5",
				)}
			>
				{daysAfterNewVersion < 7 && (
					<InfoCard
						className="grow"
						title="Nueva versión"
						icon={<Sparkle />}
						isNewVersion
					>
						<div className="flex flex-col 2xl:flex-row justify-between items-start h-full">
							<span className="text-base text-zinc-300/90">
								{VERSIONS[0]._id}
							</span>
							<AnimatedShinyText className="mx-0">
								<Link
									className="text-xs hover:underline hover:text-purple-500"
									href={`/docs/change-log#${VERSIONS[0]._id}`}
								>
									¿Qué hay de nuevo?
								</Link>
							</AnimatedShinyText>
						</div>
					</InfoCard>
				)}
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
					{pendingOrders}
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

function InfoCard({
	title,
	icon,
	children,
	isNewVersion = false,
	className,
}: {
	title: string;
	icon: React.ReactNode;
	children?: React.ReactNode;
	isNewVersion?: boolean;
	className?: string;
}) {
	return (
		<Card className={className}>
			{isNewVersion && (
				<BorderBeam size={100} colorFrom="#a855f7" colorTo="#fff" />
			)}
			<CardBody className="p-4">
				<h4 className="text-base text-zinc-400 flex items-center justify-between gap-x-2">
					{title}
					{icon}
				</h4>
				<span className="text-2xl h-full">{children}</span>
			</CardBody>
		</Card>
	);
}
