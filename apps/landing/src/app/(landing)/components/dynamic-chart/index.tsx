import { Card, CardBody } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import Chart from "./chart";

export default function xDynamicChart() {
	return (
		<section className="relative flex flex-col-reverse place-items-center md:grid grid-cols-[1fr_40%] gap-16">
			<Card variant="borderless" className="w-full">
				<CardBody className="w-full">
					<div className="lw-attribution absolute bottom-14 left-4 z-10 text-xs">
						<Link
							target="_blank"
							href="https://tradingview.github.io/lightweight-charts/"
						>
							Powered by Lightweight Charts™
						</Link>
					</div>
					<Chart />
				</CardBody>
			</Card>
			<article className="flex flex-col items-center justify-center gap-8 w-full">
				<h2 className="text-4xl font-medium text-purple-500 text-center">
					Reporte de ventas
				</h2>
				<p className="font-medium dark:text-zinc-300 text-center text-lg">
					Puedes ver un reporte de tus ventas en un periodo de tiempo, para que
					puedas ver como va tu negocio.
				</p>
				<picture className="md:flex lg:flex xl:flex 2xl:flex justify-center hidden">
					<Image
						src="/svg/analytics.svg"
						alt="Reporte de ventas"
						width={200}
						height={200}
					/>
				</picture>
			</article>
		</section>
	);
}
