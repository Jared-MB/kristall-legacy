import type { UUID } from "node:crypto";

export enum SEVERITY {
	LOW = "Low",
	MEDIUM = "Medium",
	HIGH = "High",
	CRITICAL = "Critical",
}

export interface Report {
	_id: UUID;
	errorMessage: string;
	errorCode: string;
	severity: SEVERITY;
	functionName: string;
	fileName: string;
	lineNumber: number;
	context: Record<string, any>;
	userId: string | null;
	createdAt: Date;
	isResolved: boolean;
	resolvedAt: Date | null;
	resolution: string | null;
}

export type ReportRaw = Omit<Report, "severity"> & {
	severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
};
