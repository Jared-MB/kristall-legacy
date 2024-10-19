import SettingsLink from "../components/settings-link";

export default function GeneralSettingsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="max-w-5xl grid grid-cols-[20%_1fr] gap-x-8 mx-auto py-8">
			<aside className="flex flex-col gap-y-1">
				<SettingsLink
					orientation="vertical"
					href="/dashboard/settings/general/inventory"
					layoutId="settings-link-tab"
					className="h-12"
				>
					Inventario
				</SettingsLink>
				<SettingsLink
					orientation="vertical"
					href="/dashboard/settings/general/pos"
					layoutId="settings-link-tab"
					className="h-12"
				>
					Punto de Ventas
				</SettingsLink>
				<SettingsLink
					orientation="vertical"
					href="/dashboard/settings/general/experimental"
					layoutId="settings-link-tab"
					className="h-12"
				>
					Experimental
				</SettingsLink>
			</aside>
			{children}
		</div>
	);
}
