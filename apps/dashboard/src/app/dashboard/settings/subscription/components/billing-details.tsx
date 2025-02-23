import type { StripePlan } from "@kristall/core/interfaces/stripe";

import { Card, CardBody, CardHeader, CardTitle } from "@kristall/ui/card";
import { CreditCard } from "lucide-react";

export function BillingDetails({ data }: { data: StripePlan }) {
	return (
		<Card className="bg-zinc-900 border-zinc-800">
			<CardHeader className="pb-3">
				<CardTitle className="text-xl text-zinc-100 flex items-center gap-2">
					<CreditCard className="h-5 w-5" />
					Detalles de facturación
				</CardTitle>
			</CardHeader>
			<CardBody>
				<div className="flex flex-col gap-4 justify-between h-full">
					<div className="flex justify-between items-center">
						<span className="text-sm text-zinc-400">Plan {data.nickname}</span>
						<span className="text-sm text-zinc-100">
							${data.amount / 100}.00
						</span>
					</div>
					<div className="flex justify-between items-center">
						<span className="text-sm text-zinc-400">Virtual Showroom</span>
						<span className="text-sm text-zinc-100 line-through">$0.00</span>
					</div>
					<div className="border-t border-zinc-800 pt-4 flex justify-between items-center">
						<span className="text-base font-medium text-zinc-100">
							Total mensual
						</span>
						<span className="text-base font-medium text-zinc-100">
							${data.amount / 100}
						</span>
					</div>
				</div>
			</CardBody>
		</Card>
	);
}

/**
 * @example
 *
 * <Discount price="$10.00" priceWithDiscount="$2.00" />
 */
function Discount({
	price,
	priceWithDiscount,
}: { price: string; priceWithDiscount: string }) {
	return (
		<div className="text-right">
			<span className="text-sm text-zinc-100 line-through mr-2">${price}</span>
			<span className="text-sm text-green-500">${priceWithDiscount}</span>
		</div>
	);
}
