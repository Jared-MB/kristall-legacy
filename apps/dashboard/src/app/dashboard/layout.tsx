import {
	CalendarDays,
	ClipboardList,
	HandCoins,
	LayoutDashboard,
	MapPinned,
	Package,
	ReceiptText,
	ShoppingBasket,
	Users,
} from "lucide-react";

import Divider from "@/components/divider";
import NavLink from "@/components/nav-link";

import Routes from "@/constants/routes";
import type { Metadata } from "next";
import "../globals.css";

import Header from "@/components/layout/header";
import ReportLink from "./components/report-link";

export const metadata: Metadata = {
	title: "Kristall - Dashboard",
};

export default async function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-[20dvw_1fr] xl:grid-cols-[15dvw_1fr] grid-rows-[4rem_1fr] ">
			<aside className="border-r border-r-zinc-700 hidden lg:flex flex-col h-dvh row-span-2 print:hidden">
				<h1 className="text-4xl text-purple-500 grid place-content-center h-16 border-b border-b-zinc-700">
					Kristall
				</h1>
				<nav className="flex flex-col gap-y-4 px-6 py-4">
					<NavLink icon={<LayoutDashboard />} href={Routes.DASHBOARD}>
						Dashboard
					</NavLink>
					<Divider />
					<NavLink icon={<ShoppingBasket />} href={Routes.SALES}>
						Ventas
					</NavLink>
					<NavLink icon={<Package />} href={Routes.INVENTORY}>
						Inventario
					</NavLink>
					<NavLink icon={<MapPinned />} href={Routes.LOCATIONS}>
						Ubicaciones
					</NavLink>
					<NavLink icon={<CalendarDays />} href={Routes.BATCHES}>
						Lotes
					</NavLink>
					<Divider />
					<NavLink icon={<ClipboardList />} href={Routes.ORDERS}>
						Pedidos
					</NavLink>
					<NavLink icon={<Users />} href={Routes.CUSTOMERS}>
						Clientes
					</NavLink>
					<Divider />
					<NavLink icon={<ReceiptText />} href={Routes.NOTES}>
						Notas
					</NavLink>
					<NavLink icon={<HandCoins />} href={Routes.EXPENSES}>
						Gastos
					</NavLink>
					<Divider />
					<NavLink icon={<Users />} href={Routes.USERS}>
						Usuarios
					</NavLink>
					<ReportLink />
				</nav>
			</aside>
			<Header />
			{children}
		</div>
	);
}
