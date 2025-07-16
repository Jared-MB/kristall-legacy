import Routes from "@/constants/routes";
import { isFeatureEnabled } from "@kristall/client/utils/version";

import {
	AlphaFeature,
	BetaFeature,
	ComingSoon,
	NewFeature,
} from "@kristall/ui/announcements";
import {
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@kristall/ui/sidebar";
import {
	AppWindowMac,
	BookText,
	CalendarDays,
	ChartColumnStacked,
	ClipboardList,
	HandCoins,
	LayoutDashboard,
	MapPinned,
	Package,
	ReceiptText,
	Settings,
	ShoppingBasket,
	Users,
} from "lucide-react";
import { AppSidebarLink } from "./app-sidebar-link";
import { ReportLink } from "./report-link";

import {
	AVAILABLE_SINCE,
	AVAILABLE_SINCE_MINOR,
	PAGE_DEVELOPMENT_STATUS,
} from "../virtual-showroom/page";

function VirtualShowroomStatus() {
	if (PAGE_DEVELOPMENT_STATUS === "Alpha") {
		return <AlphaFeature position="right" />;
	}
	if (PAGE_DEVELOPMENT_STATUS === "Beta") {
		return <BetaFeature position="right" />;
	}
	return <NewFeature position="right" />;
}

export async function AppSidebarNavigation() {
	const isEnabled = await isFeatureEnabled(
		AVAILABLE_SINCE,
		AVAILABLE_SINCE_MINOR,
	);

	return (
		<SidebarContent>
			<SidebarGroup>
				<SidebarGroupLabel>General</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<AppSidebarLink href={Routes.DASHBOARD}>
									<LayoutDashboard />
									<span>Dashboard</span>
								</AppSidebarLink>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarGroup>
			<SidebarGroup>
				<SidebarGroupLabel>Operaciones</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<AppSidebarLink href={Routes.SALES}>
									<ShoppingBasket />
									<span>Ventas</span>
								</AppSidebarLink>
							</SidebarMenuButton>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<AppSidebarLink href={Routes.INVENTORY}>
									<Package />
									<span>Inventario</span>
								</AppSidebarLink>
							</SidebarMenuButton>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<AppSidebarLink href={Routes.LOCATIONS}>
									<MapPinned />
									<span>Ubicaciones</span>
								</AppSidebarLink>
							</SidebarMenuButton>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<AppSidebarLink href={Routes.BATCHES}>
									<CalendarDays />
									<span>Lotes</span>
								</AppSidebarLink>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarGroup>
			<SidebarGroup>
				<SidebarGroupLabel>Gestión de Clientes y Pedidos</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<AppSidebarLink href={Routes.ORDERS}>
									<ClipboardList />
									<span>Pedidos</span>
								</AppSidebarLink>
							</SidebarMenuButton>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<AppSidebarLink href={Routes.CUSTOMERS}>
									<Users />
									<span>Clientes</span>
								</AppSidebarLink>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarGroup>
			{isEnabled ? (
				<SidebarGroup>
					<SidebarGroupLabel>Virtual Showroom</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild disabled>
									<AppSidebarLink
										/**href={Routes.VIRTUAL_SHOWROOM_ANALYTICS}**/
										className="cursor-not-allowed opacity-50"
										href=""
									>
										<ChartColumnStacked />
										<span>Analíticas</span>
										<ComingSoon position="right" />
									</AppSidebarLink>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<AppSidebarLink href={Routes.VIRTUAL_SHOWROOM}>
										<AppWindowMac />
										<span>VS - Dashboard</span>
										<VirtualShowroomStatus />
									</AppSidebarLink>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			) : null}
			<SidebarGroup>
				<SidebarGroupLabel>Finanzas</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<AppSidebarLink href={Routes.NOTES}>
									<ReceiptText />
									<span>Notas de venta</span>
								</AppSidebarLink>
							</SidebarMenuButton>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<AppSidebarLink href={Routes.EXPENSES}>
									<HandCoins />
									<span>Gastos</span>
								</AppSidebarLink>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarGroup>
			<SidebarGroup>
				<SidebarGroupLabel>Administración</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<AppSidebarLink href={Routes.USERS}>
									<Users />
									<span>Usuarios</span>
								</AppSidebarLink>
							</SidebarMenuButton>
						</SidebarMenuItem>
						<ReportLink />
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarGroup>
			<SidebarGroup>
				<SidebarGroupLabel>Sistema</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<AppSidebarLink href="/dashboard/settings/general">
									<Settings />
									<span>Configuración</span>
								</AppSidebarLink>
							</SidebarMenuButton>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<AppSidebarLink href="/docs">
									<BookText />
									<span>Documentación</span>
								</AppSidebarLink>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarGroup>
		</SidebarContent>
	);
}
