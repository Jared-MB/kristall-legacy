import type { Metadata } from "next";
import { Quicksand } from "next/font/google";

import { ToastContainer } from "react-toastify";

import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import "./globals.css";

const quicksand = Quicksand({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
	metadataBase: new URL("https://kristall.app"),
	title: "Kristall",
	description:
		"El gestor de inventarios, pedidos y punto de ventas para pequeños negocios y emprendedores.",
	keywords: [
		"kristall",
		"inventario",
		"ventas",
		"negocio",
		"pos",
		"punto de venta",
		"gestor de inventarios",
		"gestor de ventas",
		"gestor de negocios",
		"Kristall",
		"Kristall POS",
		"Kristall Punto de Venta",
		"Kristall Gestor de Inventarios",
		"Kristall Gestor de Ventas",
		"Kristall Gestor de Negocios",
		"Punto de ventas México",
		"Kristall Mexico",
		"Kristall POS Mexico",
		"Kristall Punto de Venta Mexico",
		"Kristall Gestor de Inventarios Mexico",
		"Kristall Gestor de Ventas Mexico",
		"Kristall Gestor de Negocios Mexico",
		"Punto de ventas",
		"Kristall POS",
		"Kristall Punto de Venta",
		"Kristall Gestor de Inventarios",
		"Kristall Gestor de Ventas",
		"Kristall Gestor de Negocios",
		"Punto de ventas México",
		"Kristall Mexico",
		"Kristall POS Mexico",
		"Kristall Punto de Venta Mexico",
		"Kristall Gestor de Inventarios Mexico",
		"Kristall Gestor de Ventas Mexico",
		"Kristall Gestor de Negocios Mexico",
		"Gestor de pedidos Mexico",
		"Punto de ventas ligero",
		"Mejor punto de ventas",
		"Emprendedores",
		"Punto de ventas emprendedores",
		"Punto de ventas emprendedor",
		"Punto de ventas para emprendedores",
		"Punto de ventas para emprendedor",
		"Punto de ventas para pequeños negocios",
		"Punto de ventas para pequeño negocio",
		"Punto de ventas para pequeñas empresas",
		"Punto de ventas para pequeña empresa",
	],
	category: "Software as a Service",
	openGraph: {
		siteName: "Kristall",
		title: "Kristall",
		description:
			"El gestor de inventarios, pedidos y punto de ventas para pequeños negocios y emprendedores.",
		images: [
			{
				url: "/kristall.webp",
				width: 1200,
				height: 630,
				alt: "Kristall",
			},
		],
		locale: "es_ES",
		type: "website",
		url: "/",
	},
	robots: "index, follow",
	abstract: "El gestor de inventarios para pequeños negocios y emprendedores.",
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="es" suppressHydrationWarning>
			<body
				className={cn(
					"min-h-screen bg-background dark:text-zinc-300 font-sans antialiased",
					quicksand.variable,
				)}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					{children}
					<ToastContainer autoClose={3000} />
				</ThemeProvider>
			</body>
		</html>
	);
}
