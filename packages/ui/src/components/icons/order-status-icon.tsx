import type { OrderStatus } from "@kristall/core/modules/orders/interfaces";

import { cn } from "@/core/utils";
import {
	CircleOff,
	LoaderPinwheelIcon,
	Package,
	PackageCheck,
	TimerIcon,
	TruckIcon,
} from "lucide-react";

const Icon = {
	received: TimerIcon,
	preparing: LoaderPinwheelIcon,
	delivering: TruckIcon,
	ready: Package,
	completed: PackageCheck,
	cancelled: CircleOff,
} as { [key in OrderStatus]: any };

export default function OrderStatusIcon({
	status,
	animate = false,
}: {
	status: OrderStatus;
	animate?: boolean;
}) {
	const IconComponent = Icon[status];
	if (!IconComponent) return null;
	return <IconComponent className={cn("w-5 h-5", animate && "animate-spin")} />;
}
