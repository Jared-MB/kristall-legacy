import type { Order } from "@kristall/core/modules/orders/interfaces";

import { cn } from "@/core/utils";
import {
	BoxIcon,
	LoaderPinwheelIcon,
	TimerIcon,
	TruckIcon,
} from "lucide-react";

export default function OrderStatusIcon({
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
