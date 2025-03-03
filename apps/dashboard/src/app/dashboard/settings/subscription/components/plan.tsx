import { getPlanByPriceId } from "@kristall/core/stripe/prices";

export async function Plan({ id }: { id: string }) {
	const plan = await getPlanByPriceId(id);

	if (!plan) return null;

	return (
		<>
			<span className="text-2xl font-semibold text-zinc-100">
				{plan.nickname}
			</span>
			<span className="text-xl text-zinc-400 ml-2">
				<span className="text-base">$</span>
				{(plan.unit_amount ?? 0) / 100}
				<span className="text-lg ml-2">MXN/mes</span>
			</span>
		</>
	);
}
