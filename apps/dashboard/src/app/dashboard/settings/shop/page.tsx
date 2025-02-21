import { getShopData } from "@kristall/core/shop/data";

import {
	Card,
	CardBody,
	CardDescription,
	CardFooter,
	CardTitle,
} from "@kristall/ui/card";
import { UserCog, Wallet } from "lucide-react";
import Setting from "../components/setting";
import { SettingChange } from "../components/setting-change";
import ShopImage from "./components/shop-image";

export default async function ShopPage() {
	const { logo, shopName } = await getShopData();

	return (
		<Setting>
			<Card>
				<CardBody className="grid grid-cols-[1fr_auto] gap-x-4 md:gap-0">
					<div className="flex flex-col gap-3 justify-center">
						<CardTitle>Logo</CardTitle>
						<CardDescription>
							Este es el logo de tu tienda. Haz clic en el logo de la derecha
							para subir uno personalizado desde tus archivos.
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
			<SettingChange
				title="Paquete"
				redirectTo="/dashboard/settings/subscription#subscription"
			>
				<UserCog className="text-purple-500 h-12 w-12" />
			</SettingChange>
			<SettingChange
				title="Cancelar suscripción"
				redirectTo="/dashboard/settings/subscription#cancel-subscription"
			>
				<Wallet className="text-purple-500 h-12 w-12" />
			</SettingChange>
		</Setting>
	);
}
