"use client";

import { motion, useMotionValueEvent } from "motion/react";
import { Aboreto } from "next/font/google";

import { MainPage } from "./main-page";
import { PreviewSave } from "./preview-save";

import { ComingSoon } from "@kristall/ui/announcements";
import { ScrollArea, ScrollBar } from "@kristall/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@kristall/ui/tabs";
import { useActionState, useRef, useState } from "react";
import { usePreview } from "./preview-context";

import { uploadVirtualShowroomConfig } from "@kristall/core/virtual-showroom/config/upload";

const aboreto = Aboreto({
	subsets: ["latin"],
	weight: ["400"],
	variable: "--font-serif",
});

export function Preview() {
	const { scrollYProgress, shopName } = usePreview();

	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		if (latest > 0.25) {
			setPadding(1);
			return;
		}
		if (latest > 0.15) {
			setPadding(Number(((latest - 0.15) / (0.25 - 0.15)).toFixed(2)));
			return;
		}
		setPadding(0);
	});

	const [padding, setPadding] = useState(0);

	const formRef = useRef<HTMLFormElement>(null);

	const [_, dispatch] = useActionState(uploadVirtualShowroomConfig, undefined);

	return (
		<Tabs defaultValue="index" className={`${aboreto.variable} w-full`}>
			<motion.div
				style={{
					padding: `0 ${padding}rem`,
				}}
				className="sticky top-4 z-10 flex items-start justify-between"
			>
				<ScrollArea className="max-w-md rounded-md">
					<TabsList className="mb-4">
						<TabsTrigger value="index">Inicio</TabsTrigger>
						<TabsTrigger value="products" disabled className="relative">
							Productos
						</TabsTrigger>
						<TabsTrigger value="categories" disabled className="relative">
							Categorías <ComingSoon />
						</TabsTrigger>
					</TabsList>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
				<PreviewSave ref={formRef} />
			</motion.div>
			<form ref={formRef} action={dispatch}>
				<TabsContent value="index">
					<MainPage shopName={shopName} />
				</TabsContent>
			</form>
		</Tabs>
	);
}
