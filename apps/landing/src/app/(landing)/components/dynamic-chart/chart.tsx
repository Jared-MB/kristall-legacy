"use client";

import { ColorType, createChart } from "lightweight-charts";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useRef } from "react";

const initialIncomesData = [
	{ time: "2023-12-22", value: 320.51 },
	{ time: "2023-12-23", value: 310.11 },
	{ time: "2023-12-24", value: 270.02 },
	{ time: "2023-12-25", value: 270.32 },
	{ time: "2023-12-26", value: 250.17 },
	{ time: "2023-12-27", value: 280.89 },
	{ time: "2023-12-28", value: 250.46 },
	{ time: "2023-12-29", value: 330.92 },
	{ time: "2023-12-30", value: 320.68 },
	{ time: "2023-12-31", value: 220.67 },
];
const initialExpensesData = [
	{ time: "2023-12-22", value: 180.51 },
	{ time: "2023-12-23", value: 150.11 },
	{ time: "2023-12-24", value: 130.02 },
	{ time: "2023-12-25", value: 140.32 },
	{ time: "2023-12-26", value: 120.17 },
	{ time: "2023-12-27", value: 110.89 },
	{ time: "2023-12-28", value: 100.46 },
	{ time: "2023-12-29", value: 80.92 },
	{ time: "2023-12-30", value: 170.68 },
	{ time: "2023-12-31", value: 130.67 },
];

export default function Chart(props: any) {
	const { theme } = useTheme();

	const currentLocale =
		typeof window !== "undefined" ? window.navigator.languages[0] : "es-MX";
	// Create a number format using Intl.NumberFormat
	const myPriceFormatter = Intl.NumberFormat(currentLocale, {
		style: "currency",
		currency: "MXN", // Currency for data points
	}).format;

	const {
		incomesData = initialIncomesData,
		expensesData = initialExpensesData,
	} = props;

	const earningsData = useMemo(() => {
		const earningsData = [];
		for (let i = 0; i < incomesData.length; i++) {
			earningsData.push({
				time: incomesData[i].time,
				value: incomesData[i].value - expensesData[i].value,
			});
		}
		return earningsData;
	}, [incomesData, expensesData]);

	const chartContainerRef = useRef();

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
				// FIX: SET CORRECTLY WHEN THE COLOR SCHEME IS ALREADY SET
				textColor: theme === "dark" ? "white" : "white",
			},
			// @ts-ignore
			width: chartContainerRef.current.clientWidth,
			height: 520,
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
			handleScale: false,
			handleScroll: false,
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
		expensesSeries.setData(expensesData);

		const incomesSeries = chart.addAreaSeries({
			lineColor: "#0ea5e9",
			topColor: "#0ea5e9",
			title: "Ingresos",
			bottomColor: "rgba(0, 0, 0, 0)",
			// lineColor,
			// topColor: incomeChartColors.areaTopColor,
			// bottomColor: incomeChartColors.areaBottomColor,
		});
		incomesSeries.setData(incomesData);

		const earningsSeries = chart.addAreaSeries({
			title: "Ganancias",
			lineColor: "#22c55e",
			topColor: "#22c55e",
			bottomColor: "rgba(0, 0, 0, 0)",
			// color: earningsChartColors.lineColor,
			// lineWidth: 2,
		});
		earningsSeries.setData(earningsData);

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);

			chart.remove();
		};
	}, [
		incomesData,
		theme,
		expensesData,
		// backgroundColor,
		// lineColor,
		// textColor,
		// areaTopColor,
		// areaBottomColor,
	]);

	// @ts-ignore
	return <div className="w-full" ref={chartContainerRef} />;
}
