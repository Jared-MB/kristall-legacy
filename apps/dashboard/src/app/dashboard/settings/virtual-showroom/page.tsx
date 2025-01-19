import {
	Card,
	CardBody,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Setting from "../components/setting";

import { Switch } from "@kristall/ui/switch";
import { Suspense } from "react";
import { ExperimentalFeature } from "../components/experimental-feature";
import { VirtualShowroom } from "./components/virtual-showroom";
import { VirtualShowroomSwitch } from "./components/virtual-showroom-switch";

export const AVAILABLE_SINCE = "v0.10.";
export const AVAILABLE_SINCE_MINOR = Number(AVAILABLE_SINCE.split(".")[1]);

export default async function VirtualShowroomPage() {
	return (
		<Setting>
			<section className="flex flex-col gap-y-2">
				<CardTitle>Virtual Showroom</CardTitle>
				<CardDescription>
					Tu plataforma para exhibir productos de forma atractiva en línea.
					Conecta directamente con clientes interesados en tus productos.
				</CardDescription>
			</section>
			<Card>
				<CardHeader>
					<CardTitle>Habilitar Virtual Showroom</CardTitle>
					<CardDescription>
						¡Destaca tus productos en nuestro Virtual Showroom! Al aceptar, tus
						productos serán visibles para todos los visitantes de nuestra
						página. Asegúrate de revisar tus configuraciones antes de confirmar.
					</CardDescription>
				</CardHeader>
				<CardBody className="pt-0 flex-row justify-between items-center">
					<div className="flex flex-row gap-x-2 items-center">
						<Suspense fallback={<Switch disabled />}>
							<VirtualShowroomSwitch />
						</Suspense>
						<Label htmlFor="virtual-showroom">Habilitar Virtual Showroom</Label>
					</div>
					<ExperimentalFeature />
				</CardBody>
			</Card>
			<Suspense fallback={""}>
				<VirtualShowroom />
			</Suspense>
		</Setting>
	);
}
