import { Card, CardBody, CardHeader, CardTitle } from "@kristall/ui/card";

import { getStripeAccount } from "@kristall/core/stripe/get";
import { Button } from "@kristall/ui/button";
import { AlertTriangle } from "lucide-react";
import { CancelSubscriptionForm } from "./cancel-subscription-form";

export async function CancelSubscription() {
	const data = await getStripeAccount();

	if (!data || data.status === "none") return null;

	return (
		<Card
			id="cancel-subscription"
			className="bg-zinc-900 border-zinc-800 relative overflow-hidden"
		>
			<div className="absolute inset-0 bg-linear-to-br from-rose-500/10 via-transparent to-transparent pointer-events-none" />
			<CardHeader className="pb-3">
				<CardTitle className="text-xl text-zinc-100 flex items-center gap-2">
					<AlertTriangle className="h-5 w-5 text-rose-400" />
					Cancelar suscripción
				</CardTitle>
			</CardHeader>
			<CardBody>
				<div className="space-y-4">
					<p className="text-sm text-zinc-300 leading-relaxed max-w-[80ch]">
						Si cancelas tu suscripción, una vez acabado el periodo de
						facturación, no podrás acceder a tu tienda y se deshabilitará el
						Virtual Showroom.
					</p>
					{/* FOR FUTURE USE WHEN WE CAN REACTIVATE THE SUBSCRIPTION */}
					{/* <small className="text-xs text-zinc-400 italic">
						(Tus datos y productos se borrarán pasados 3 meses de inactividad)
					</small> */}
					<div className="pt-2">
						{data.cancelAtPeriodEnd ? (
							<Button
								disabled
								variant="destructive"
								className="bg-rose-600 hover:bg-rose-700 text-white"
							>
								Suscripción cancelada
							</Button>
						) : (
							<CancelSubscriptionForm />
						)}
					</div>
				</div>
			</CardBody>
		</Card>
	);
}
