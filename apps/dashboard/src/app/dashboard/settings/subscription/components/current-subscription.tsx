import { format } from "@formkit/tempo";
import { getShopData } from "@kristall/core/shop/data";
import { getStripeAccount } from "@kristall/core/stripe/get";

import { Card, CardBody, CardHeader, CardTitle } from "@kristall/ui/card";

import { CheckCircle2, Package } from "lucide-react";

export async function CurrentSubscription() {
	const { shopName } = await getShopData();
	const data = await getStripeAccount();

	console.log(data);

	if (!data) return null;

	return (
		<Card id="subscription">
			<CardHeader className="pb-0">
				<CardTitle className="text-3xl font-medium text-purple-400">
					{shopName}
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
							<span className="text-2xl font-semibold text-zinc-100">
								{data.nickname}
							</span>
							<div className="rounded-full bg-purple-500/10 px-2 py-0.5 text-xs font-medium text-purple-500">
								Activo
							</div>
						</div>
					</div>
					<div className="space-y-1">
						<div className="text-sm text-zinc-400">Próximo pago</div>
						<div className="flex items-center gap-2">
							<CheckCircle2 className="h-4 w-4 text-purple-500" />
							<span className="text-sm font-medium text-zinc-100 capitalize">
								{format(data.current_period_end, {
									date: "full",
								})}
							</span>
						</div>
					</div>
				</div>
			</CardBody>
		</Card>
	);
}
