import { Button } from "@kristall/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@kristall/ui/card";

import { AlertTriangle } from "lucide-react";

export function CancelSubscription() {
	return (
		<Card className="bg-zinc-900 border-zinc-800 relative overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-transparent to-transparent pointer-events-none" />
			<CardHeader className="pb-3">
				<CardTitle className="text-xl text-zinc-100 flex items-center gap-2">
					<AlertTriangle className="h-5 w-5 text-rose-400" />
					Cancelar suscripción
				</CardTitle>
			</CardHeader>
			<CardBody>
				<div className="space-y-4">
					<p className="text-sm text-zinc-300 leading-relaxed">
						Si cancelas tu suscripción, una vez acabado el periodo de
						facturación, no podrás acceder a tu tienda y se deshabilitará el
						Virtual Showroom. Podrás reactivarla en cualquier momento.
					</p>
					<small className="text-xs text-zinc-400 italic">
						(Tus datos y productos se borrarán pasados 3 meses de inactividad)
					</small>
					<div className="pt-2">
						<Button
							variant="destructive"
							className="bg-rose-600 hover:bg-rose-700 text-white"
						>
							Cancelar suscripción
						</Button>
					</div>
				</div>
			</CardBody>
		</Card>
	);
}
