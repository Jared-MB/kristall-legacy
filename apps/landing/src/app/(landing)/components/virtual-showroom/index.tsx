import KFigure from "@/components/k-figure";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import Marquee from "@/components/ui/marquee";
import RadialGradient from "@/components/ui/radial-gradient";
import { PRODUCTS_EXAMPLE, ProductExample } from "@/constants/objects";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import ShowroomAnimation from "./showroom-animation";

const firstRow = PRODUCTS_EXAMPLE.slice(0, PRODUCTS_EXAMPLE.length / 2);
const secondRow = PRODUCTS_EXAMPLE.slice(PRODUCTS_EXAMPLE.length / 2);

const ReviewCard = ({ name, price }: ProductExample) => {
	return (
		<Card className="w-64">
			<CardBody>
				<div className="flex flex-row items-center gap-2">
					<KFigure />
					<div className="flex flex-col">
						<figcaption className="text-sm font-medium dark:text-white">
							{name}
						</figcaption>
						<p className="text-xs font-medium dark:text-white/40">${price}</p>
					</div>
				</div>
				<blockquote className="mt-2 text-sm">
					<Button variant="link" size="sm" className="px-0">
						Ver disponibilidad
						<ExternalLink className="ml-2 w-3 h-3" />
					</Button>
				</blockquote>
			</CardBody>
		</Card>
	);
};

export default function VirtualShowroom() {
	return (
		<>
			<Card variant="container" className="py-16 overflow-hidden col-span-3">
				<CardBody className="max-w-lg flex flex-col gap-y-4 items-center mx-auto z-20">
					<h2 className="text-4xl font-semibold">
						Virtual Showroom{" "}
						<small className="text-base text-zinc-400">(beta)</small>
					</h2>
					<p className="text-zinc-400 text-center">
						Descubre una nueva forma de interactuar con tus productos y atraer a
						tus clientes.Permite a tus clientes explorar tus productos como
						nunca antes.
					</p>
					<Button asChild variant="link">
						<Link href="/solutions/virtual-showroom">Ver más</Link>
					</Button>
				</CardBody>
				<article className="absolute z-0 inset-0 opacity-60 flex justify-center flex-col">
					<Marquee pauseOnHover className="[--duration:20s]">
						{firstRow.map((review) => (
							<ReviewCard key={review._id} {...review} />
						))}
					</Marquee>
					<Marquee reverse pauseOnHover className="[--duration:20s]">
						{secondRow.map((review) => (
							<ReviewCard key={review._id} {...review} />
						))}
					</Marquee>
				</article>
				<div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background" />
				<div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background" />
				<RadialGradient from="#18181b" className="z-10" size={600} />
			</Card>
			<ShowroomAnimation />
		</>
	);
}
