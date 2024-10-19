import Divider from "@/components/divider";
import { CardBody, CardDescription, CardSubtitle } from "@/components/ui";
import { access } from "@/core/modules/users";
import { Fragment } from "react";
import EnableDashboard from "./enable-dashboard";
import PermissionsGroup from "./permissions-group";

export default async function DashboardPermissions({
	isAdmin,
	_id,
}: {
	isAdmin: boolean;
	_id: string;
}) {
	const hasAccess = await access.getDashboardAccess(_id);
	const permissions = await access.getDashboardSpecificAccess(_id);

	const uploadPermissions = access.updateDashboardSpecificAccess.bind(
		null,
		_id,
	);

	return (
		<Fragment>
			<CardBody>
				<CardSubtitle>Dashboard</CardSubtitle>
				<CardDescription className="max-w-3xl">
					Desde aquí puede gestionar toda la información de tu negocio. Puedes
					dar permiso de manera más granular a este usuario para que tenga
					acceso a secciones específicas que tú decidas.
				</CardDescription>
				<EnableDashboard
					_id={_id}
					isAdmin={isAdmin}
					enabledDashboard={hasAccess}
				/>
			</CardBody>
			<Divider />
			<form action={uploadPermissions}>
				<CardBody className="grid grid-cols-3 gap-4">
					<PermissionsGroup
						id="inventory"
						enabledAll={isAdmin}
						disabledAll={!hasAccess || isAdmin}
						permissions={permissions}
					>
						Inventario
					</PermissionsGroup>
					<PermissionsGroup
						id="orders"
						enabledAll={isAdmin}
						disabledAll={!hasAccess || isAdmin}
						permissions={permissions}
					>
						Pedidos
					</PermissionsGroup>
					<PermissionsGroup
						id="customers"
						enabledAll={isAdmin}
						disabledAll={!hasAccess || isAdmin}
						permissions={permissions}
					>
						Clientes
					</PermissionsGroup>
					<PermissionsGroup
						id="locations"
						enabledAll={isAdmin}
						disabledAll={!hasAccess || isAdmin}
						permissions={permissions}
					>
						Ubicaciones
					</PermissionsGroup>
					<PermissionsGroup
						id="notes"
						enabledAll={isAdmin}
						disabledAll={!hasAccess || isAdmin}
						permissions={permissions}
					>
						Notas
					</PermissionsGroup>
					<PermissionsGroup
						id="expenses"
						enabledAll={isAdmin}
						disabledAll={!hasAccess || isAdmin}
						permissions={permissions}
					>
						Gastos
					</PermissionsGroup>
				</CardBody>
			</form>
		</Fragment>
	);
}
