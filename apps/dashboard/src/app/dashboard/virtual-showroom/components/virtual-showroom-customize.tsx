"use client";

import { useScroll } from "motion/react";
import { useRef } from "react";

import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@kristall/ui/card";
import { ScrollArea } from "@kristall/ui/scroll-area";
import { Preview } from "./customize/preview";
import { PreviewProvider } from "./customize/preview-context";

export function VirtualShowroomCustomize({ shopName }: { shopName: string }) {
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({ container: ref });

	return (
		<ScrollArea className="px-6 h-full" ref={ref}>
			<div className="flex flex-col gap-y-6 relative">
				<Card>
					<CardHeader>
						<CardTitle>Personaliza tu Virtual Showroom</CardTitle>
						<CardDescription>
							¡Haz que tu Virtual Showroom sea único! Personaliza el texto
							inicial y la imagen de portada!
						</CardDescription>
					</CardHeader>
				</Card>
				<PreviewProvider shopName={shopName} scrollYProgress={scrollYProgress}>
					<Preview />
				</PreviewProvider>
			</div>
		</ScrollArea>
	);
}
