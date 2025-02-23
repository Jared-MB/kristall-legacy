import { format } from "@formkit/tempo";
import { PAYMENT_STATUS } from "@kristall/core/stripe/constants/payment-status";
import { getStripePaymentHistory } from "@kristall/core/stripe/get";
import { Card, CardBody, CardHeader, CardTitle } from "@kristall/ui/card";
import { CheckCircle2, Clock } from "lucide-react";

export async function SubscriptionHistory() {
	const data = await getStripePaymentHistory();

	if (!data) return null;

	return (
		<Card className="bg-zinc-900 border-zinc-800">
			<CardHeader className="pb-3">
				<CardTitle className="text-xl text-zinc-100 flex items-center gap-2">
					<Clock className="h-5 w-5" />
					Historial de suscripción
				</CardTitle>
			</CardHeader>
			<CardBody>
				<div className="space-y-4">
					{data.map((item) => (
						<div key={item.id} className="grid grid-cols-3 gap-4">
							<span className="text-sm text-zinc-400 capitalize">
								{format({
									date: new Date(item.created * 1000),
									format: "full",
									tz: "America/Mexico_City",
								})}
							</span>
							<span className="text-base text-zinc-100  justify-self-end">
								${item.amount / 100}{" "}
								<small>{item.currency.toUpperCase()}</small>
							</span>
							<div className="rounded-full px-2 py-0.5 text-xs font-medium text-purple-500 bg-purple-500/10 justify-self-end flex items-center gap-2">
								<CheckCircle2 className="h-4 w-4 text-purple-500" />
								{(PAYMENT_STATUS as any)[item.status] ?? "Desconocido"}
							</div>
						</div>
					))}
				</div>
			</CardBody>
		</Card>
	);
}
