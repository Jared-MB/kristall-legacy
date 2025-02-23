import { format } from "@formkit/tempo";
import { CheckCircle2, ClockAlert, Package } from "lucide-react";
import { Suspense } from "react";

import { getStripeAccount } from "@kristall/core/stripe/get";

import { Card, CardBody, CardHeader } from "@kristall/ui/card";
import { ShopName, ShopNameSkeleton } from "./shop-name";

import { cn } from "@kristall/ui/utils/cn";

export async function CurrentSubscription() {
	const data = await getStripeAccount();

	if (!data) return null;

	return (
		<Card id="subscription">
			<CardHeader className="pb-0">
				<Suspense fallback={<ShopNameSkeleton />}>
					<ShopName />
				</Suspense>
			</CardHeader>
			<CardBody>
				<div className="space-y-4">
					<div className="space-y-2">
						<div className="flex items-center gap-2">
							<Package className="h-5 w-5 text-zinc-400" />
							<span className="text-sm font-medium text-zinc-400">Paquete</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-2xl font-semibold text-zinc-100">
								{data.nickname}
							</span>
							<div
								className={cn(
									"rounded-full px-2 py-0.5 text-xs font-medium",
									!data.cancel_at_period_end
										? "text-purple-500 bg-purple-500/10"
										: "text-rose-500 bg-rose-500/10",
								)}
							>
								{!data.cancel_at_period_end ? "Activo" : "Cancelado"}
							</div>
						</div>
					</div>
					<div className="space-y-1">
						<div className="text-sm text-zinc-400">
							{!data.cancel_at_period_end
								? "Próximo pago"
								: "Fecha de vencimiento"}
						</div>
						<div className="flex items-center gap-2">
							{!data.cancel_at_period_end ? (
								<CheckCircle2 className="h-4 w-4 text-purple-500" />
							) : (
								<ClockAlert className="h-4 w-4 text-rose-500" />
							)}
							<span className="text-sm font-medium text-zinc-100 capitalize">
								{format({
									date: data.current_period_end,
									format: "full",
									tz: "America/Mexico_City",
									locale: "es",
								})}
							</span>
						</div>
					</div>
				</div>
			</CardBody>
		</Card>
	);
}
