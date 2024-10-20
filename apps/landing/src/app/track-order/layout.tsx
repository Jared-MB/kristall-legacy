import Link from "next/link";

export default function TrackOrderLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			<header className="dark:bg-zinc-900 dark:text-zinc-300 px-8 flex items-center justify-between md:justify-evenly h-16 shadow fixed w-[100dvw] bg-zinc-900 z-50">
				<h1>
					<Link href="/" className="text-purple-500 text-4xl">
						Kristall
					</Link>
				</h1>
				<h2 className="text-2xl">
					<Link href="/track-order">Order Tracking</Link>
				</h2>
			</header>
			{children}
		</div>
	);
}
