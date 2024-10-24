import { cn } from "@/core/utils";
import { ChartBar } from "lucide-react";
import type React from "react";

interface Props {
	name: string;
	status: "ok" | "error" | number;
	children: React.ReactNode;
}

export default function Service({ children, name, status }: Props) {
	const statusText = status === "ok" ? "Operational" : "Incident";

	return (
		<div className="bg-card p-4 rounded-lg">
			<div className="flex items-center gap-3 mb-2">
				<span
					className={cn(status === "ok" ? "text-green-500" : "text-red-500")}
				>
					{children}
				</span>
				<h3 className="text-lg font-medium capitalize">{name}</h3>
			</div>
			<div className="flex items-center gap-2">
				<div
					className={cn(
						"h-3 w-3 rounded-full",
						status === "ok" ? "bg-green-500" : "bg-red-500",
					)}
				/>
				<span
					className={cn(
						"text-sm",
						status === "ok" ? "text-green-500" : "text-red-500",
					)}
				>
					{statusText}
				</span>
			</div>
		</div>
	);
}
