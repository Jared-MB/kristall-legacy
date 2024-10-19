import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";
import OrderFragment from "./components/order-fragment/component";

const triangle = {
	width: 0,
	height: 0,
	borderBottom: "100px solid #000",
	borderLeft: "calc(100vw-16px) solid transparent",
};

export default function OrdersPage() {
	return (
		<section>
			<article className=" flex md:grid lg:grid xl:grid grid-cols-[1fr_55%] gap-20 place-items-center pt-4 md:pt-12 lg:pt-12 mx-8 md:mx-20 lg:mx-20">
				<picture className="relative flex justify-center items-center">
					<Image
						src="/svg/blob.svg"
						alt="Blob"
						width={500}
						height={500}
						className=""
					/>
					<Image
						src="/svg/order_delivery.svg"
						alt="Orders"
						width={360}
						height={360}
						className="absolute"
					/>
				</picture>
				<div className="flex items-center flex-col gap-6">
					<h2 className="text-4xl md:text-5xl lg:text-5xl font-medium text-center pt-4 max-w-3xl text-purple-500">
						Gestiona tus pedidos y genera notas de entrega
					</h2>
					<p className="text-center max-w-xl">
						Ten un control total de tus pedidos, desde la creación hasta la
						entrega. Conoce el estado de cada pedido y mantén informado a tus
						clientes.
					</p>
					<Button
						as={Link}
						href="/pricing"
						color="primary"
						className="mt-8 mx-auto relative"
					>
						Crear cuenta
					</Button>
				</div>
			</article>
			<div>
				<div className="w-0 h-0 border-b-[100px] border-b-zinc-800 border-l-[calc(100dvw-8px)] border-l-transparent" />
				<article className="bg-zinc-800 pt-8 pb-16 px-16 grid grid-cols-[1fr_auto] gap-16 place-items-center">
					<div>
						<h3 className="text-4xl font-medium pt-8 pb-4 text-purple-500 flex items-center gap-4"></h3>
						<p className="max-w-xs text-sm">
							Crea pedidos con los productos de tu inventario, añade la
							dirección de entrega y elige el método de pago.
						</p>
					</div>
					<OrderFragment />
				</article>
				<div className="w-0 h-0 border-t-[100px] border-t-zinc-800 relative border-r-[calc(100dvw-8px)] border-r-transparent" />
			</div>
		</section>
	);
}
