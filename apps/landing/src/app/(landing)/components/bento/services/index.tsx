import { AiFillShop } from "react-icons/ai";
import { BsReceipt } from "react-icons/bs";
import { FaBoxesStacked } from "react-icons/fa6";
// import { PiNotebook } from "react-icons/pi";
import { HiOutlineUsers } from "react-icons/hi";
import { MdOutlineLocationOn } from "react-icons/md";

import OrderCard from "@/components/order-card";
import { Badge } from "@/components/ui/badge";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Divider from "@/components/ui/divider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ORDER_EXAMPLE } from "@/constants/objects";
import Inventory from "./inventory";
import Locations from "./locations";
import UserPermissions from "./user-permissions";

const users = [
	{
		_id: 1,
		name: "Adrian Lino",
		username: "linoxyz",
		email: "user@example.com",
		role: "admin",
		permissions: "all",
	},
	{
		_id: 2,
		name: "Randy Hernandez",
		username: "NotRandy",
		email: "user2@example.com",
		role: "user",
		permissions: "inventory.read,inventory.write,orders.read,orders.write",
	},
];

interface Service {
	Icon: any;
	name: string;
	description: string;
	href: string;
	cta: string;
	background: React.ReactNode;
	className: string;
}

const services: Service[] = [
	{
		Icon: FaBoxesStacked,
		name: "Administración de inventario",
		description:
			"Administra tu inventario de manera fácil, sencilla y desde cualquier lugar.",
		href: "/",
		cta: "Ver más",
		background: <Inventory />,
		className: "lg:row-start-1 lg:row-end-3 lg:col-start-2 lg:col-end-3",
	},
	{
		Icon: HiOutlineUsers,
		name: "Clientes",
		description:
			"Administra a tus clientes y ten un mejor control de tus ventas.",
		href: "/",
		cta: "Ver más",
		background: null,
		className: "lg:col-start-1 lg:col-end-2 lg:row-start-4 lg:row-end-5",
	},
	{
		Icon: BsReceipt,
		name: "Pedidos",
		description: "Crea pedidos para tus clientes y envíaselos como tu quieras.",
		href: "/solutions/orders",
		cta: "Ver más",
		background: (
			<OrderCard
				className="mt-0 absolute -right-10 top-10 origin-top transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_30%,#000_100%)] scale-90  group-hover:scale-105"
				order={ORDER_EXAMPLE}
			/>
		),
		className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-4",
	},
	{
		Icon: AiFillShop,
		name: "Gestión de ventas",
		description: "Punto de venta para tu negocio físico.",
		href: "/",
		cta: "Ver más",
		background: null,
		className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
	},
	{
		Icon: HiOutlineUsers,
		name: "Usuarios",
		description: "Controla donde acceden tus empleados y que pueden hacer.",
		href: "/",
		cta: "Ver más",
		background: (
			<div className="mt-0 absolute -right-10 top-10 origin-top transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_50%,#000_100%)] scale-80  group-hover:scale-90">
				<Tabs defaultValue={users[0].username}>
					<TabsList>
						{users.map((user) => (
							<TabsTrigger key={user._id} value={user.username}>
								{user.name}
							</TabsTrigger>
						))}
					</TabsList>
					{users.map((user) => (
						<TabsContent value={user.username} key={user._id}>
							<Card>
								<CardHeader>
									<CardTitle>
										{user.name}
										<small className="text-zinc-500 text-sm ml-2">
											({user.username})
										</small>
									</CardTitle>
									<CardDescription>{user.email}</CardDescription>
									<Badge
										variant="secondary"
										className="capitalize absolute top-4 right-4"
									>
										{user.role}
									</Badge>
								</CardHeader>
								<Divider />
								<form>
									<UserPermissions
										permissions={user.permissions}
										role={user.role ?? "user"}
									/>
									<CardFooter className="justify-end">
										<Button>Guardar cambios</Button>
									</CardFooter>
								</form>
							</Card>
						</TabsContent>
					))}
				</Tabs>
			</div>
		),
		className: "lg:row-start-3 lg:row-end-5 lg:col-start-2 lg:col-end-3",
	},
	{
		Icon: MdOutlineLocationOn,
		name: "¿Vendes en más de un lugar?",
		description:
			"Ten más de una ubicación para tu negocio y adminístralas desde un solo lugar.",
		href: "/",
		cta: "Ver más",
		background: <Locations />,
		className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-5",
	},
];

export default function Services() {
	return (
		<BentoGrid className="auto-rows-[25rem] sm:auto-rows-fr">
			{services.map((feature) => (
				<BentoCard key={feature.name} {...feature} />
			))}
		</BentoGrid>
	);
}
