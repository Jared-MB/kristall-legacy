export const API_REST = process.env.NEXT_PUBLIC_SERVER_API;

export type Package = "basic" | "standard" | "plus";
export enum PackageEnum {
	BASIC = "basic",
	STANDARD = "standard",
	PLUS = "plus",
}

export const RESTRICTIONS = {
	MAX_LOCATIONS: {
		basic: 1,
		standard: 2,
		plus: 4,
	},
	MAX_USERS: {
		basic: 1,
		standard: 2,
		plus: 4,
	},
};

export const PRICES = {
	basic: 125,
	standard: 200,
	plus: 350,
};

export const ORDER_STATUS = {
	received: "Recibido",
	preparing: "Preparando",
	delivering: "En camino",
	ready: "Listo para recoger",
	completed: "Completado",
};

export const PERMISSIONS = [
	"inventory.read",
	"inventory.write",
	"inventory.delete",
	"orders.read",
	"orders.write",
	"orders.delete",
	"customers.read",
	"customers.write",
	"customers.delete",
	"locations.read",
	"locations.write",
	"locations.delete",
	"notes.read",
	"notes.write",
	"notes.delete",
	"expenses.read",
	"expenses.write",
	"expenses.delete",
	"dashboard.read",
	"sales.read",
	"shop.read",
];

export const PERMISSIONS_LABELS = {
	inventory: "Inventario",
	orders: "Pedidos",
	customers: "Clientes",
	locations: "Ubicaciones",
	notes: "Notas",
	expenses: "Gastos",
	dashboard: "Dashboard",
	sales: "Ventas",
	shop: "Tienda",
};

export const PERMISSIONS_ACTIONS = {
	read: "Acceder",
	write: "Escribir / Editar",
	delete: "Eliminar",
};
