export default function ShopsLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<main className="flex min-h-screen flex-col relative">
			{children}
			<small className="absolute bottom-1 left-1 text-zinc-500">v1.1.0</small>
		</main>
	);
}
