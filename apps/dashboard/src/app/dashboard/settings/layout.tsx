import { Card } from "@/components/ui";
import SettingsLink from "./components/settings-link";
import { VirtualShowroomLink } from "./virtual-showroom/link";

export default function SettingsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			<Card
				as="nav"
				className="!border-x-transparent !border-t-transparent rounded-none"
			>
				<ul className="flex flex-row gap-x-6 p-4">
					<SettingsLink href="/dashboard/settings/general">
						General
					</SettingsLink>
					<SettingsLink href="/dashboard/settings/profile">Perfil</SettingsLink>
					<SettingsLink href="/dashboard/settings/shop">Tienda</SettingsLink>
					<VirtualShowroomLink />
					<SettingsLink href="/dashboard/settings/bank-accounts">
						Cuentas bancarias
					</SettingsLink>
					<SettingsLink href="/dashboard/settings/subscription">
						Suscripción
					</SettingsLink>
				</ul>
			</Card>
			<div className="h-[calc(100dvh-8rem)] overflow-y-scroll">{children}</div>
		</div>
	);
}
