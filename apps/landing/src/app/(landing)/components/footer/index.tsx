import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// NextJS uses seconds instead of milliseconds
const EVERY_HALF_HOUR = 60 * 30;

export default async function Footer() {
	let status = {
		text: "Todos los sistemas normales",
		color: "green",
	};

	try {
		const res = await fetch("https://status.kristall.app/api/status", {
			next: { revalidate: EVERY_HALF_HOUR },
		});
		const data = (await res.json()) as {
			status: "ok" | "error";
			key: string;
		}[];

		const allOk = data.every((d) => d.status === "ok");
		const allError = data.every((d) => d.status === "error");
		const someOk = !allOk && !allError;

		if (allOk) {
			status = {
				text: "Todos los sistemas normales",
				color: "green",
			};
		} else if (allError) {
			status = {
				text: "Nuestros sistemas están experimentando problemas",
				color: "red",
			};
		} else if (someOk) {
			status = {
				text: "Algunos sistemas están experimentando problemas",
				color: "yellow",
			};
		}
	} catch (error) {
		status = {
			text: "Nuestros sistemas están experimentando problemas",
			color: "red",
		};
	}

	return (
		<footer className="dark:bg-zinc-900 border-t border-t-zinc-200 relative dark:border-t-zinc-800 md:px-24 py-12 flex flex-row gap-y-2 justify-end sm:justify-between w-full">
			<Link
				href="https://status.kristall.app"
				target="_blank"
				className="absolute sm:relative left-0"
			>
				<Badge
					variant="outline"
					showPin={true}
					pinVariant={
						status.color === "green"
							? "default"
							: status.color === "yellow"
								? "warning"
								: "destructive"
					}
				>
					{status.text}
				</Badge>
			</Link>
			<div className="flex flex-col gap-y-2 items-end">
				<small>
					<span>Ilustraciones por:</span>
					<Link
						className="underline ml-1 font-bold"
						target="_blank"
						href="https://undraw.co/"
					>
						unDraw
					</Link>
				</small>
				<small>
					<span>Componentes UI:</span>
					<Link
						href="https://magicui.design/"
						className="underline ml-1 font-bold"
						target="_blank"
					>
						Magic UI
					</Link>
				</small>
				<small className="flex flex-col items-end text-right">
					<span>
						TradingView Lightweight Charts™ Copyright (с) 2023 TradingView, Inc.
					</span>
					<Link
						className="underline ml-1 font-bold"
						target="_blank"
						href="https://www.tradingview.com/"
					>
						https://www.tradingview.com/
					</Link>
				</small>
			</div>
		</footer>
	);
}
