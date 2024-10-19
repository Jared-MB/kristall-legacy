import { Card, CardBody } from "@/components/ui";
import { Skeleton } from "@/components/ui/skeleton";
import { addDay } from "@formkit/tempo";
import {
	ClipboardList,
	LineChart,
	TrendingDown,
	TrendingUp,
} from "lucide-react";
import type { Analytics } from "./_interfaces";
import MoneyChart from "./money-chart";
import ProductsChartSkeleton from "./products-chart/skeleton";

const analytics: Analytics = {
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

export default function AnalyticsSkeleton() {
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
				<MoneyChart analytics={analytics} />
				<ProductsChartSkeleton />
			</div>
		</div>
	);
}
