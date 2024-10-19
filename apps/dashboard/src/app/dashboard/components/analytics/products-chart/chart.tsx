"use client";

import { Pie, PieChart } from "recharts";

import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import type { BestSeller } from "@/types/product";
import { useMemo } from "react";

export default function Chart({ products }: { products: BestSeller[] }) {
	const chartConfig = useMemo(() => {
		const config = {
			visitors: {
				label: "Visitors",
			},
		} as ChartConfig;

		products.forEach((product, index) => {
			config[product.name] = {
				label: product.name,
				color: `hsl(var(--chart-${index + 1}))`,
			};
		});

		return config;
	}, [products]) satisfies ChartConfig;

	const chartData = useMemo(() => {
		return products.map((product) => ({
			...product,
			fill: chartConfig[product.name].color,
		}));
	}, [products, chartConfig]);

	return (
		<div className="flex-auto">
			<ChartContainer
				config={chartConfig}
				className="mx-auto aspect-square max-h-[250px] w-full"
			>
				<PieChart>
					<ChartTooltip
						cursor={false}
						content={<ChartTooltipContent hideLabel />}
					/>
					<Pie
						data={chartData}
						dataKey="totalSales"
						nameKey="name"
						label={({ payload, ...props }) => {
							return (
								<text
									cx={props.cx}
									cy={props.cy}
									x={props.x}
									y={props.y}
									textAnchor={props.textAnchor}
									dominantBaseline={props.dominantBaseline}
									fill="hsla(var(--foreground))"
								>
									{payload.name}
								</text>
							);
						}}
					/>
				</PieChart>
			</ChartContainer>
		</div>
	);
}
