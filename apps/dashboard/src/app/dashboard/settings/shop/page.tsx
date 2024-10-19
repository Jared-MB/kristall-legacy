import { getShopData } from "@/actions/user.action";
import Divider from "@/components/divider";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardBody,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Item, ItemTitle, ItemValue } from "@/components/ui/item";
import Setting from "../components/setting";
import ShopImage from "./components/shop-image";

export default async function ShopPage() {
	const { logo, shopName } = await getShopData({
		tags: ["shop"],
	});

	return (
		<Setting>
			<Card>
				<CardBody className="grid grid-cols-[1fr_auto] gap-x-4 md:gap-0">
					<div className="flex flex-col gap-3 justify-center">
						<CardTitle>Logo</CardTitle>
						<CardDescription>
							<span>Este es el logo de tu tienda.</span>
							<span>
								Haz clic en el logo de la derecha para subir uno personalizado
								desde tus archivos.
							</span>
						</CardDescription>
					</div>
					<aside>
						<ShopImage logo={logo} shopName={shopName} />
					</aside>
				</CardBody>
				<CardFooter>
					<p className="text-zinc-300/80 text-sm">
						El logo de tu tienda es importante para que tus clientes te
						reconozcan. Asegúrate de que sea claro y fácil de identificar.
					</p>
				</CardFooter>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Tienda</CardTitle>
				</CardHeader>
				<Divider />
				<CardBody>
					<Item>
						<ItemTitle>Paquete</ItemTitle>
						<ItemValue>Plus</ItemValue>
					</Item>
					<Item>
						<ItemTitle>Estado</ItemTitle>
						<ItemValue>Activo</ItemValue>
					</Item>
				</CardBody>
				<CardFooter className="gap-x-2">
					<span className="font-medium">Próximo pago:</span>
					<small className="text-sm text-zinc-300/60">
						Viernes, Abril 26, 2024
					</small>
				</CardFooter>
			</Card>
			<Card variant="destructive">
				<CardHeader>
					<CardTitle>Cancelar suscripción</CardTitle>
				</CardHeader>
				<CardBody className="pt-0">
					<p className="md:w-[100ch] text-pretty">
						Si cancelas tu suscripción, una vez acabado el periodo de
						facturación, no podrás acceder a tu tienda y se deshabilitara el
						Virtual Showroom. Podrás reactivarla en cualquier momento.{" "}
						<small className="text-zinc-300/60">
							(Tus datos y productos se borrarán pasados 3 meses de inactividad)
						</small>
					</p>
					<p>Para cancelar tu suscripción, haz clic en el botón de abajo.</p>
				</CardBody>
				<CardFooter className="justify-end">
					<Button variant="destructive">Cancelar suscripción</Button>
				</CardFooter>
			</Card>
		</Setting>
	);
}
