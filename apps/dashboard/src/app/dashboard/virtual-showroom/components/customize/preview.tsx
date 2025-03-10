import { Tabs, TabsContent, TabsList, TabsTrigger } from "@kristall/ui/tabs";

import { getShopData } from "@kristall/core/shop/data";
import { ComingSoon } from "@kristall/ui/announcements";
import { ScrollArea, ScrollBar } from "@kristall/ui/scroll-area";
import { Aboreto } from "next/font/google";
import { MainPage } from "./main-page";
import { PreviewProvider } from "./preview-context";
import { PreviewSave } from "./preview-save";

const aboreto = Aboreto({
	subsets: ["latin"],
	weight: ["400"],
	variable: "--font-serif",
});

export async function Preview() {
	const { shopName } = await getShopData();

	return (
		<Tabs defaultValue="index" className={`${aboreto.variable} w-full`}>
			<PreviewProvider>
				<div className="flex items-center justify-between">
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
				</div>
				<TabsContent value="index">
					<MainPage shopName={shopName} />
				</TabsContent>
			</PreviewProvider>
		</Tabs>
	);
}
