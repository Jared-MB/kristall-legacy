import { getOrderByCode } from "@/actions/order.actions";
import {
	OrderProgressDesktop,
	OrderProgressMobile,
} from "@/components/component/order-progress";
import OrderCard from "@/components/order-card";
import { redirect } from "next/navigation";

export default async function Order(
    props: {
        params: Promise<{ order: string }>;
    }
) {
    const params = await props.params;
    const order = await getOrderByCode(params.order);

    if (!order) {
		redirect("/track-order?error=not-found");
	}

    return (
		<main className="pt-24 pb-8 px-8">
			<OrderProgressDesktop status={order.status} />
			<OrderProgressMobile status={order.status} />
			<OrderCard order={order} />
			<div className="flex items-center justify-center w-full mt-8">
				<small className="text-zinc-400 text-center text-pretty max-w-md">
					<strong>Este no es un comprobante de compra.</strong> Para recoger su
					pedido, presente el ticket que la tienda le proporcionó al realizar la
					compra, ya sea en físico o digital.
				</small>
			</div>
		</main>
	);
}
