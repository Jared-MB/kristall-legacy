import { LoaderPinwheelIcon } from "@/components/icons/loader";
import { cn } from "@/core/utils";
import type { Order } from "@/types/order";
import { BoxIcon, TimerIcon, TruckIcon } from "lucide-react";

export default function StatusIcon({
	status,
	animate = false,
}: {
	status: Order["status"];
	animate?: boolean;
}) {
	if (status === "received" || status === "completed") {
		return <TimerIcon className="w-5 h-5" />;
	}
	if (status === "preparing") {
		return (
			<LoaderPinwheelIcon
				className={cn("w-5 h-5 ", animate && "animate-spin")}
			/>
		);
	}
	if (status === "delivering") {
		return <TruckIcon className="w-5 h-5" />;
	}
	if (status === "ready") {
		return <BoxIcon className="w-5 h-5" />;
	}
}
