import { randomUUID } from "node:crypto";
import type { ReportRaw } from "../interfaces";

export const REPORTS: ReportRaw[] = [
	{
		_id: randomUUID(),
		context: {
			shopId: "test",
			operation: "getLatestReports",
			timestamp: "2024-11-04T04:22:17.394Z",
		},
		createdAt: new Date(),
		errorCode: "Error",
		errorMessage: "Reports service error",
		lineNumber: 18,
		isResolved: false,
		resolvedAt: null,
		severity: "LOW",
		functionName: "ReportsController.getLatestReports",
		fileName:
			"C:/kristall/apps/server/src/modules/reports/controllers/reports.controller.ts",
		resolution: null,
		userId: null,
	},
	{
		_id: randomUUID(),
		context: {
			shopId: "kristall",
			operation: "getLatestOrders",
			timestamp: "2024-11-03T04:22:17.394Z",
		},
		createdAt: new Date(),
		errorCode: "Error",
		errorMessage: "Orders service error",
		lineNumber: 18,
		isResolved: false,
		resolvedAt: null,
		severity: "MEDIUM",
		functionName: "OrdersController.getLatestOrders",
		fileName:
			"C:/kristall/apps/server/src/modules/orders/controllers/orders.controller.ts",
		resolution: null,
		userId: null,
	},
];
