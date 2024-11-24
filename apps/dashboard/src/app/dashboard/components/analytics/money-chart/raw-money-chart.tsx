"use client";

import type { Analytics } from "@kristall/core/modules/analytics/interfaces";

import { format } from "@formkit/tempo";
import { ColorType, createChart } from "lightweight-charts";
import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";

export default function RawMoneyChart({ analytics }: { analytics: Analytics }) {
	const incomesData = useMemo(() => {
		const earnings = analytics.earningsByDay.map((day) => ({
			time: format(new Date(day.date), "YYYY-MM-DD"),
			value: Number(day.earnings),
		}));
		return earnings;
	}, [analytics]);

	const expensesData = useMemo(() => {
		const costs = analytics.earningsByDay.map((day) => ({
			time: format(new Date(day.date), "YYYY-MM-DD"),
			value: Number(day.cost),
		}));
		return costs;
	}, [analytics]);

	const revenue = useMemo(() => {
		const revenue = analytics.earningsByDay.map((day) => ({
			time: format(new Date(day.date), "YYYY-MM-DD"),
			value: Number(day.earnings) - Number(day.cost),
		}));
		return revenue;
	}, [analytics]);

	const currentLocale =
		typeof window !== "undefined" ? window.navigator.languages[0] : "es-MX";
	// Create a number format using Intl.NumberFormat
	const myPriceFormatter = Intl.NumberFormat(currentLocale, {
		style: "currency",
		currency: "MXN", // Currency for data points
	}).format;

	const chartContainerRef = useRef(undefined);

	useEffect(() => {
		const handleResize = () => {
			// @ts-ignore
			chart.applyOptions({ width: chartContainerRef.current.clientWidth });
		};

		// @ts-ignore
		const chart = createChart(chartContainerRef.current, {
			layout: {
				background: {
					type: ColorType.Solid,
					color: "transparent",
				},
				textColor: "white",
			},
			// @ts-ignore
			width: chartContainerRef.current.clientWidth,
			height: 400,
			grid: {
				horzLines: {
					visible: false,
				},
				vertLines: {
					visible: false,
				},
			},
			crosshair: {
				horzLine: {
					labelBackgroundColor: "#a855f7",
				},
			},
			localization: {
				priceFormatter: myPriceFormatter,
			},
			// handleScale: false,
			// handleScroll: false,
		});
		chart.timeScale().fitContent();

		const expensesSeries = chart.addAreaSeries({
			lineColor: "#f43f5e",
			title: "Gastos",
			topColor: "#f43f5e",
			bottomColor: "rgba(0, 0, 0, 0)",
			// lineColor: expenseChartColors.lineColor,
			// topColor: expenseChartColors.areaTopColor,
			// bottomColor: expenseChartColors.areaBottomColor,
		});

		expensesSeries.setData(expensesData as any);

		const incomesSeries = chart.addAreaSeries({
			lineColor: "#0ea5e9",
			topColor: "#0ea5e9",
			title: "Ingresos",
			bottomColor: "rgba(0, 0, 0, 0)",
			// lineColor,
			// topColor: incomeChartColors.areaTopColor,
			// bottomColor: incomeChartColors.areaBottomColor,
		});

		incomesSeries.setData(incomesData as any);

		const earningsSeries = chart.addAreaSeries({
			title: "Ganancias",
			lineColor: "#22c55e",
			topColor: "#22c55e",
			bottomColor: "rgba(0, 0, 0, 0)",
			// color: earningsChartColors.lineColor,
			// lineWidth: 2,
		});

		earningsSeries.setData(revenue as any);

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);

			chart.remove();
		};
	}, [incomesData, expensesData]);

	return (
		<div
			className="w-[340px] md:w-[400px] xl:w-[700px] h-[400px] relative"
			id="dashboard-chart"
		>
			<span className="lw-attribution absolute top-0 left-4 z-10 text-xs">
				<Link
					target="_blank"
					href="https://tradingview.github.io/lightweight-charts/"
				>
					Powered by Lightweight Charts™
				</Link>
			</span>
			{/* @ts-ignore */}
			<div ref={chartContainerRef} />
		</div>
	);
}
