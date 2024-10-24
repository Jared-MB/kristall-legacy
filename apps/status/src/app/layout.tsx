import type { Metadata } from "next";

import { quicksand } from "@/core/config";
import { cn } from "@/core/utils";

import "./globals.css";

export const metadata: Metadata = {
	title: "Kristall Status",
	description: "The status page for Kristall",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased",
					quicksand.variable,
				)}
			>
				{children}
			</body>
		</html>
	);
}
