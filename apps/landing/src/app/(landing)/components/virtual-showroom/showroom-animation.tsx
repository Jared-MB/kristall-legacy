"use client";

import { Circle } from "@/components/ui/animated-beam";
import { BentoGrid } from "@/components/ui/bento-grid";
import { BorderBeam } from "@/components/ui/border-beam";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Users } from "lucide-react";
import { useRef } from "react";
import { FaBoxesStacked } from "react-icons/fa6";

export default function ShowroomAnimation() {
	const containerRef = useRef<HTMLDivElement>(null);

	const centerRef = useRef<HTMLDivElement>(null);

	const card1Ref = useRef<HTMLDivElement>(null);
	const card2Ref = useRef<HTMLDivElement>(null);
	const card3Ref = useRef<HTMLDivElement>(null);

	return (
		<BentoGrid ref={containerRef} className="place-items-center hidden md:grid">
			<Circle
				className="col-span-3 relative rounded-full bg-zinc-900 z-20 text-purple-500 text-6xl w-28 h-28"
				ref={centerRef}
			>
				K
			</Circle>
			<div className="absolute top-0 left-[16%] w-1/3 h-3/4">
				<BorderBeam className="z-10" duration={4} />
				<div className="bg-zinc-900 absolute top-1/4 z-10 -right-[1px] w-full h-3/4" />
			</div>
			<div className="absolute z-10 top-1/4 left-[calc(50%+1px)] h-1/2">
				<BorderBeam className="z-10" duration={6} />
			</div>
			<div className="absolute top-1/4 right-[16%] w-1/3 h-1/2 mirror">
				<BorderBeam className="z-10" duration={5} />
				<div className="bg-zinc-900 absolute -bottom-[1px] z-10 -right-[1px] w-full h-full" />
			</div>
			<Card
				className="w-full h-fit z-20 justify-center bg-zinc-900 inner-shadow overflow-hidden"
				ref={card1Ref}
			>
				<div className="p-6 pb-0">
					<FaBoxesStacked className="w-12 h-12 text-zinc-500" />
				</div>
				<CardHeader className="pb-0">
					<CardTitle>Tus productos</CardTitle>
				</CardHeader>
				<CardBody>
					<p className="text-zinc-400">
						Exhibe tus productos de manera atractiva, organizada y actualizada.
					</p>
				</CardBody>
				{/* <BorderBeam /> */}
			</Card>
			<Card
				className="w-full h-fit z-20 justify-center bg-zinc-900 inner-shadow overflow-hidden"
				ref={card2Ref}
			>
				<div className="p-6 pb-0">
					<Users className="w-12 h-12 text-zinc-500" />
				</div>
				<CardHeader className="pb-0">
					<CardTitle>Tus clientes</CardTitle>
				</CardHeader>
				<CardBody>
					<p className="text-zinc-400">
						Ofrece a tus clientes una forma sencilla de comprar tus productos.
					</p>
				</CardBody>
				{/* <BorderBeam delay={20} /> */}
			</Card>
			<Card
				className="w-full h-fit z-20 justify-center bg-zinc-900 inner-shadow overflow-hidden"
				ref={card3Ref}
			>
				<div className="p-6 pb-0">
					<MapPin className="w-12 h-12 text-zinc-500" />
				</div>
				<CardHeader className="pb-0">
					<CardTitle>Tus ubicaciones</CardTitle>
				</CardHeader>
				<CardBody>
					<p className="text-zinc-400">
						Gestiona y actualiza tus ubicaciones en tiempo real desde cualquier
						lugar.
					</p>
				</CardBody>
				{/* <BorderBeam delay={10} /> */}
			</Card>
		</BentoGrid>
	);
}
