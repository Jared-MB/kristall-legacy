import { getShopData } from "@/actions/user.action";
import Divider from "@/components/divider";
import {
	Card,
	CardBody,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { Item, ItemTitle, ItemValue } from "@/components/ui/item";
import Setting from "../components/setting";
import ChangePasswordForm from "./components/change-password/change-password-form";

export default async function ProfilePage() {
	const shop = await getShopData();

	if (!shop) {
		return null;
	}

	return (
		<Setting>
			<Card>
				<CardHeader>
					<CardTitle>Perfil</CardTitle>
				</CardHeader>
				<Divider />
				<CardBody>
					<Item>
						<ItemTitle>Nombre</ItemTitle>
						<ItemValue>{shop.username}</ItemValue>
					</Item>
					<Item>
						<ItemTitle>Usuario</ItemTitle>
						<ItemValue>{shop.username}</ItemValue>
					</Item>
					<Item>
						<ItemTitle>Negocio</ItemTitle>
						<ItemValue>{shop.shopName}</ItemValue>
					</Item>
					<Item>
						<ItemTitle>Rol</ItemTitle>
						<ItemValue>Administrador</ItemValue>
					</Item>
				</CardBody>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Contraseña</CardTitle>
					<CardDescription>
						Actualiza tu contraseña constantemente para mantener tu cuenta
						segura.
					</CardDescription>
				</CardHeader>
				<Divider />
				<CardBody>
					<ChangePasswordForm />
				</CardBody>
			</Card>
		</Setting>
	);
}
