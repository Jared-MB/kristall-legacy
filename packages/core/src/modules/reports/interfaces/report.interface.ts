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
	userId: string;
	createdAt: Date;
	isResolved: boolean;
	resolvedAt: Date;
	resolution: string;
}
