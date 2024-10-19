export default function ProductIdLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <main className="p-8 overflow-y-auto h-layout">{children}</main>;
}
