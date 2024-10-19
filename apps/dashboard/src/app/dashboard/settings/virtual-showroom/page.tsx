import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardBody,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import CopyToClipboard from "@/components/ui/copy-to-clipboard";
import { Label } from "@/components/ui/label";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import Setting from "../components/setting";

import {
	getBestSellersProducts,
	getNewProducts,
} from "@/actions/products/public-products.action";
import { getShopData } from "@/actions/user.action";
import { getVirtualShowroom } from "@/actions/virtual-showroom";
import { Fragment } from "react";
import Customize from "./components/customize";
import ToggleVirtualShowroom from "./components/toggle-virtual-showroom";

export default async function VirtualShowroomPage() {
	const virtualShowroom = await getVirtualShowroom();
	const { shopName } = await getShopData();
	const data = await getBestSellersProducts(virtualShowroom?.url ?? "");
	const newProducts = await getNewProducts(virtualShowroom?.url ?? "");

	return (
		<Setting>
			<section className="flex flex-col gap-y-2">
				<CardTitle>Virtual Showroom</CardTitle>
				<CardDescription>
					Tu plataforma para exhibir productos de forma atractiva en línea.
					Conecta directamente con clientes interesados en tus productos.
				</CardDescription>
			</section>
			<Card>
				<CardHeader>
					<CardTitle>Habilitar Virtual Showroom</CardTitle>
					<CardDescription>
						¡Destaca tus productos en nuestro Virtual Showroom! Al aceptar, tus
						productos serán visibles para todos los visitantes de nuestra
						página. Asegúrate de revisar tus configuraciones antes de confirmar.
					</CardDescription>
				</CardHeader>
				<CardBody className="pt-0">
					<div className="flex flex-row gap-x-2 items-center">
						<ToggleVirtualShowroom
							isPublic={virtualShowroom?.isPublic ?? false}
						/>
						<Label>Habilitar Virtual Showroom</Label>
					</div>
				</CardBody>
			</Card>
			{virtualShowroom?.isPublic && (
				<Fragment>
					<Card>
						<CardHeader className="flex-row justify-between items-center">
							<h4 className="font-medium text-lg">
								<Link
									className={buttonVariants({
										variant: "link",
										className:
											"text-zinc-300 text-xl flex flex-row items-end gap-x-2",
									})}
									target="_blank"
									rel="noreferrer"
									href={virtualShowroom.url}
								>
									{virtualShowroom.url}
									<SquareArrowOutUpRight className="w-4 h-4" />
								</Link>
							</h4>
							<CopyToClipboard text={virtualShowroom.url} />
						</CardHeader>
					</Card>
					<section className="flex flex-col gap-y-2">
						<CardTitle>Personaliza tu Virtual Showroom</CardTitle>
						<CardDescription>
							¡Haz que tu Virtual Showroom sea único! Personaliza el texto
							inicial y la imagen de portada!
						</CardDescription>
					</section>
					<Customize
						{...virtualShowroom}
						products={data}
						newProducts={newProducts}
						name={shopName}
					/>
				</Fragment>
			)}
		</Setting>
	);
}
