import { Suspense } from "react";

import {
	Card,
	CardBody,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@kristall/ui/card";
import { Label } from "@kristall/ui/label";
import { MainContent } from "@kristall/ui/layout/main-content";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@kristall/ui/resizable";
import { ScrollArea } from "@kristall/ui/scroll-area";
import { Switch } from "@kristall/ui/switch";

import { getShopData } from "@kristall/core/shop/data";
import { getVirtualShowroomConfig } from "@kristall/core/virtual-showroom/config/get";
import { getVirtualShowroom } from "@kristall/core/virtual-showroom/data";
import { ExperimentalFeature } from "../settings/components/experimental-feature";
import { ConfigProvider } from "./components/config-context";
import { VirtualShowroom } from "./components/virtual-showroom";
import { VirtualShowroomCustomize } from "./components/virtual-showroom-customize";
import { VirtualShowroomSwitch } from "./components/virtual-showroom-switch";

export const AVAILABLE_SINCE = "v0.11.";
export const AVAILABLE_SINCE_MINOR = Number(AVAILABLE_SINCE.split(".")[1]);
export const PAGE_DEVELOPMENT_STATUS: "Alpha" | "Beta" = "Beta";

export default async function VirtualShowroomPage() {
	const { shopName } = await getShopData();

	const virtualShowroom = await getVirtualShowroom();

	let config = null;

	if (virtualShowroom?.isPublic) {
		config = await getVirtualShowroomConfig();
	}

	return (
		<MainContent className="flex flex-col gap-y-6">
			<Card variant="borderless" className="shadow-none bg-transparent">
				<CardBody className="p-0">
					<CardTitle>Virtual Showroom</CardTitle>
					<CardDescription>
						Tu plataforma para exhibir productos de forma atractiva en línea.
						Conecta directamente con clientes interesados en tus productos.
					</CardDescription>
				</CardBody>
			</Card>
			<ResizablePanelGroup direction="horizontal">
				<ResizablePanel defaultSize={virtualShowroom?.isPublic ? 50 : 100}>
					<ScrollArea className="h-full pr-6">
						<div className="flex flex-col gap-y-6">
							<Card>
								<CardHeader>
									<CardTitle>Habilitar Virtual Showroom</CardTitle>
									<CardDescription>
										¡Destaca tus productos en nuestro Virtual Showroom! Al
										aceptar, tus productos serán visibles para todos los
										visitantes de nuestra página. Asegúrate de revisar tus
										configuraciones antes de confirmar.
									</CardDescription>
								</CardHeader>
								<CardBody className="pt-0 flex-row justify-between items-center">
									<div className="flex flex-row gap-x-2 items-center">
										<Suspense fallback={<Switch disabled />}>
											<VirtualShowroomSwitch />
										</Suspense>
										<Label htmlFor="virtual-showroom">
											Habilitar Virtual Showroom
										</Label>
									</div>
									<ExperimentalFeature />
								</CardBody>
							</Card>
							<Card>
								<CardBody>
									<CardDescription>
										<strong className="!text-yellow-500">
											Working progress!
										</strong>{" "}
										La opción de Virtual Showroom está en fase{" "}
										<strong>{PAGE_DEVELOPMENT_STATUS}</strong>. Puede haber
										cambios futuros en la interfaz y/o funcionalidad.{" "}
										<strong>
											¡Estamos trabajando para brindarte la mejor experiencia
											posible!
										</strong>
									</CardDescription>
								</CardBody>
							</Card>
							<VirtualShowroom />
						</div>
					</ScrollArea>
				</ResizablePanel>
				{virtualShowroom?.isPublic && (
					<>
						<ResizableHandle withHandle />
						<ResizablePanel defaultSize={50}>
							<ConfigProvider config={config}>
								<VirtualShowroomCustomize shopName={shopName} />
							</ConfigProvider>
						</ResizablePanel>
					</>
				)}
			</ResizablePanelGroup>
		</MainContent>
	);
}
