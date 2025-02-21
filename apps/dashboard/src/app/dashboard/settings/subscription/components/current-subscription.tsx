import { Card, CardBody, CardHeader, CardTitle } from "@kristall/ui/card";

import { CheckCircle2, Package } from "lucide-react";

export function CurrentSubscription() {
	return (
		<Card id="subscription">
			<CardHeader className="pb-0">
				<CardTitle className="text-3xl font-medium text-zinc-100">
					Tienda
				</CardTitle>
			</CardHeader>
			<CardBody>
				<div className="space-y-4">
					<div className="space-y-2">
						<div className="flex items-center gap-2">
							<Package className="h-5 w-5 text-zinc-400" />
							<span className="text-sm font-medium text-zinc-400">Paquete</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-2xl font-semibold text-zinc-100">Plus</span>
							<div className="rounded-full bg-purple-500/10 px-2 py-0.5 text-xs font-medium text-purple-500">
								Activo
							</div>
						</div>
					</div>
					<div className="space-y-1">
						<div className="text-sm text-zinc-400">Próximo pago</div>
						<div className="flex items-center gap-2">
							<CheckCircle2 className="h-4 w-4 text-purple-500" />
							<span className="text-sm font-medium text-zinc-100">
								Viernes, Abril 26, 2024
							</span>
						</div>
					</div>
				</div>
			</CardBody>
		</Card>
	);
}
