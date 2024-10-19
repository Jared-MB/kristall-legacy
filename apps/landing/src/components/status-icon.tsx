// import type { OrderSummary } from "@/types/order";
import { Order } from "@/types/Order";
import { BoxIcon, TimerIcon, TruckIcon } from "lucide-react";
import { LoaderPinwheelIcon } from "./icons/loader";

export default function StatusIcon({
	status,
}: {
	status: Order["status"];
}) {
	if (status === "received" || status === "completed") {
		return <TimerIcon className="w-5 h-5" />;
	}
	if (status === "preparing") {
		return <LoaderPinwheelIcon className="w-5 h-5 animate-spin" />;
	}
	if (status === "delivering") {
		return <TruckIcon className="w-5 h-5" />;
	}
	if (status === "ready") {
		return <BoxIcon className="w-5 h-5" />;
	}
}
