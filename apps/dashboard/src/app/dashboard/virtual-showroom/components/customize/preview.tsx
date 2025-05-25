"use client";

import { motion } from "motion/react";
import { Aboreto } from "next/font/google";

import { MainPage } from "./main-page";
import { PreviewSave } from "./preview-save";

import { ComingSoon } from "@kristall/ui/announcements";
import { ScrollArea, ScrollBar } from "@kristall/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@kristall/ui/tabs";
import { usePreview } from "./preview-context";
import vsCustomize from "./virtual-showroom.module.css";

const aboreto = Aboreto({
	subsets: ["latin"],
	weight: ["400"],
	variable: "--font-serif",
});

export function Preview() {
	const { shopName } = usePreview();

	return (
		<Tabs defaultValue="index" className={`${aboreto.variable} w-full`}>
			<motion.div
				className={`sticky top-0 z-10 flex items-start justify-between ${vsCustomize["vs-nav"]}`}
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
				<PreviewSave />
			</motion.div>
			<TabsContent value="index">
				<MainPage shopName={shopName} />
			</TabsContent>
		</Tabs>
	);
}
