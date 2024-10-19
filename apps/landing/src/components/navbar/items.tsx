import {
	FolderUp,
	LayoutList,
	MapPin,
	MessageCircle,
	NotepadText,
	Package,
	ShoppingBasket,
	Store,
	UserCog,
	Users,
} from "lucide-react";

interface Item {
	title: string;
	href: string;
	description: string;
	icon: JSX.Element;
	available?: boolean;
}

export const kristallPOS: Item[] = [
	{
		title: "Administración de inventario",
		href: "/solutions/inventory",
		description: "Gestiona tu inventario de manera eficiente.",
		icon: <Package className="w-6 h-6" />,
	},
	{
		title: "Control de usuarios",
		href: "/solutions/users",
		description: "Controla lo que puede hacer cada usuario.",
		icon: <UserCog className="w-6 h-6" />,
	},
	{
		title: "Gestor de pedidos",
		href: "/solutions/orders",
		description: "Ten todos tus pedidos en un solo lugar",
		icon: <NotepadText className="w-6 h-6" />,
	},
	{
		title: "Punto de ventas",
		href: "/solutions/pos",
		description: "Vende desde cualquier lugar.",
		icon: <ShoppingBasket className="w-6 h-6" />,
	},
	{
		title: "Manejo de ubicaciones",
		href: "/solutions/locations",
		description: "Administra más de una ubicación",
		icon: <MapPin className="w-6 h-6" />,
	},
	{
		title: "Control de clientes",
		href: "/solutions/customers",
		description: "Lleva un control de tus clientes",
		icon: <Users className="w-6 h-6" />,
	},
];

export const virtualShowroom: Item[] = [
	{
		title: "Catálogo de productos",
		href: "/products/virtual-showroom#catalog",
		description: "Muestra tus productos de manera virtual.",
		icon: <Store className="w-6 h-6" />,
	},
	{
		title: "Comunicación con clientes",
		href: "/products/virtual-showroom#communication",
		description: "Habla con tus clientes de manera directa.",
		icon: <MessageCircle className="w-6 h-6" />,
		available: false,
	},
];

export const kanban: Item[] = [
	{
		title: "Tablero Kanban",
		href: "/products/kanban",
		description: "Organiza tus tareas de manera visual.",
		icon: <LayoutList className="w-6 h-6" />,
	},
	{
		title: "Exporta e importa proyectos",
		href: "/products/kanban#export-import",
		description: "Mueve tus proyectos de un tablero a otro.",
		icon: <FolderUp className="w-6 h-6" />,
	},
];
