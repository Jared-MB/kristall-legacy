"use client";

import Navbar from "@/components/navbar";

export default function LandingLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<div>
			<Navbar />
			<main className="flex min-h-screen flex-col relative pt-16">
				{children}
				<small className="absolute bottom-1 left-1 text-zinc-500">v1.1.0</small>
			</main>
		</div>
	);
}
