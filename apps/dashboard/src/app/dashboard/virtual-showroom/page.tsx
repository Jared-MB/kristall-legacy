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

import { ExperimentalFeature } from "../settings/components/experimental-feature";
import { VirtualShowroom } from "./components/virtual-showroom";
import { VirtualShowroomSwitch } from "./components/virtual-showroom-switch";

export const AVAILABLE_SINCE = "v0.11.";
export const AVAILABLE_SINCE_MINOR = Number(AVAILABLE_SINCE.split(".")[1]);

export default function VirtualShowroomPage() {
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
				<ResizablePanel defaultSize={60}>
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
							<VirtualShowroom />
						</div>
					</ScrollArea>
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel defaultSize={40}>
					<div className="grid place-content-center place-items-center h-full">
						<h4 className="text-4xl text-purple-500 mb-4">Preview</h4>
						<small className="text-zinc-400">¡Próximamente!</small>
					</div>
				</ResizablePanel>
			</ResizablePanelGroup>
		</MainContent>
	);
}
