import { cn } from "@/lib/utils";
import type { Order } from "@/types/Order";
import { BoxIcon, CheckIcon, TimerIcon, TruckIcon } from "lucide-react";
import { LoaderPinwheelIcon } from "../icons/loader";

const orderStatus = [
	"received",
	"preparing",
	"delivering",
	"ready",
	"completed",
];

export function OrderProgressDesktop({
	status,
}: {
	status: Order["status"];
}) {
	const statusIndex = orderStatus.indexOf(status);
	let progress = (statusIndex + 1) * (100 / orderStatus.length);
	if (status === "completed") progress = 100;
	else if (status === "received") progress = 2.5;

	return (
		<div className="w-[calc(100dvw-4rem)] bg-gray-200 rounded-full h-4 dark:bg-gray-700 hidden md:block">
			<div
				className="bg-purple-500 h-4 rounded-full"
				style={{
					width: `${progress}%`,
				}}
			/>
			<div className="absolute flex items-center justify-between w-[calc(100dvw-4rem)] pt-2 px-2">
				<div className="flex items-center">
					<TimerIcon
						className={cn(
							"w-3 h-3 text-gray-500 dark:text-gray-400 mr-1",
							status === "received" && "text-purple-500 dark:text-purple-500",
						)}
					/>
					<span
						className={cn(
							"text-xs font-medium text-gray-500 dark:text-gray-400",
							status === "received" && "text-gray-900 dark:text-gray-100",
						)}
					>
						Recibido
					</span>
				</div>
				<div className="flex items-center">
					<LoaderPinwheelIcon
						className={cn(
							"w-3 h-3 text-gray-500 dark:text-gray-400 mr-1",
							status === "preparing" &&
								"animate-spin text-purple-500 dark:text-purple-500",
						)}
					/>
					<span
						className={cn(
							"text-xs font-medium text-gray-500 dark:text-gray-400",
							status === "preparing" && "text-gray-900 dark:text-gray-100",
						)}
					>
						Preparando
					</span>
				</div>
				<div className="flex items-center">
					<TruckIcon
						className={cn(
							"w-3 h-3 text-gray-500 dark:text-gray-400 mr-1",
							status === "delivering" && "text-purple-500 dark:text-purple-500",
						)}
					/>
					<span
						className={cn(
							"text-xs font-medium text-gray-500 dark:text-gray-400",
							status === "delivering" && "text-gray-900 dark:text-gray-100",
						)}
					>
						En camino
					</span>
				</div>
				<div className="flex items-center">
					<BoxIcon
						className={cn(
							"w-3 h-3 text-gray-500 dark:text-gray-400 mr-1",
							status === "ready" && "text-purple-500 dark:text-purple-500",
						)}
					/>
					<span
						className={cn(
							"text-xs font-medium text-gray-500 dark:text-gray-400",
							status === "ready" && "text-gray-900 dark:text-gray-100",
						)}
					>
						Listo para recoger
					</span>
				</div>
				<div className="flex items-center">
					<CheckIcon
						className={cn(
							"w-3 h-3 text-gray-500 dark:text-gray-400 mr-1",
							status === "completed" && "text-purple-500 dark:text-purple-500",
						)}
					/>
					<span
						className={cn(
							"text-xs font-medium text-gray-500 dark:text-gray-400",
							status === "completed" && "text-gray-900 dark:text-gray-100",
						)}
					>
						Completado
					</span>
				</div>
			</div>
		</div>
	);
}

export function OrderProgressMobile({
	status,
}: {
	status: Order["status"];
}) {
	const statusIndex = orderStatus.indexOf(status);
	let progress = (statusIndex + 1) * (100 / orderStatus.length);
	if (status === "completed") progress = 100;
	else if (status === "received") progress = 2.5;

	return (
		<div className="w-[calc(100dvw-4rem)] grid grid-cols-[1rem_1fr] md:hidden">
			<div className="w-4 bg-gray-200 rounded-full h-96 dark:bg-gray-700">
				<div
					className="bg-purple-500 w-4 rounded-full"
					style={{
						height: `${progress}%`,
					}}
				/>
			</div>
			<div className="flex flex-col items-start justify-between w-[calc(100dvw-4rem)] px-4">
				<div className="flex items-center">
					<TimerIcon
						className={cn(
							"w-4 h-4 text-gray-500 dark:text-gray-400 mr-1",
							status === "received" && "text-purple-500 dark:text-purple-500",
						)}
					/>
					<span
						className={cn(
							"text-sm font-medium text-gray-500 dark:text-gray-400",
							status === "received" && "text-gray-900 dark:text-gray-100",
						)}
					>
						Recibido
					</span>
				</div>
				<div className="flex items-center">
					<LoaderPinwheelIcon
						className={cn(
							"w-4 h-4 text-gray-500 dark:text-gray-400 mr-1",
							status === "preparing" &&
								"animate-spin text-purple-500 dark:text-purple-500",
						)}
					/>
					<span
						className={cn(
							"text-sm font-medium text-gray-500 dark:text-gray-400",
							status === "preparing" && "text-gray-900 dark:text-gray-100",
						)}
					>
						Preparando
					</span>
				</div>
				<div className="flex items-center">
					<TruckIcon
						className={cn(
							"w-4 h-4 text-gray-500 dark:text-gray-400 mr-1",
							status === "delivering" && "text-purple-500 dark:text-purple-500",
						)}
					/>
					<span
						className={cn(
							"text-sm font-medium text-gray-500 dark:text-gray-400",
							status === "delivering" && "text-gray-900 dark:text-gray-100",
						)}
					>
						En camino
					</span>
				</div>
				<div className="flex items-center">
					<BoxIcon
						className={cn(
							"w-4 h-4 text-gray-500 dark:text-gray-400 mr-1",
							status === "ready" && "text-purple-500 dark:text-purple-500",
						)}
					/>
					<span
						className={cn(
							"text-sm font-medium text-gray-500 dark:text-gray-400",
							status === "ready" && "text-gray-900 dark:text-gray-100",
						)}
					>
						Listo para recoger
					</span>
				</div>
				<div className="flex items-center">
					<CheckIcon
						className={cn(
							"w-4 h-4 text-gray-500 dark:text-gray-400 mr-1",
							status === "completed" && "text-purple-500 dark:text-purple-500",
						)}
					/>
					<span
						className={cn(
							"text-sm font-medium text-gray-500 dark:text-gray-400",
							status === "completed" && "text-gray-900 dark:text-gray-100",
						)}
					>
						Completado
					</span>
				</div>
			</div>
		</div>
	);
}
