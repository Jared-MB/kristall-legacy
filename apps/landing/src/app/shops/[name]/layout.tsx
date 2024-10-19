import ThemeSwitcher from "@/components/theme-switcher";
import {
	Divider,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";

export default function ShopsLayout({
	params,
	children,
}: { params: { name: string }; children: React.ReactNode }) {
	return (
		<>
			<Navbar isBordered height="4rem">
				<NavbarBrand className="flex items-center gap-x-4">
					<h1>
						<Link href="/" className="text-purple-500 text-3xl font-light">
							Kristall
						</Link>
					</h1>
					<Divider orientation="vertical" className="h-8 w-[1px] bg-zinc-300" />
					<h2 className="capitalize text-3xl  font-light">
						<Link href={`/shops/${params.name}`}>{params.name}</Link>
					</h2>
				</NavbarBrand>
				<NavbarContent>
					<NavbarItem>
						<Link href={`/shops/${params.name}/products`}>Productos</Link>
					</NavbarItem>
					<NavbarItem>
						<ThemeSwitcher />
					</NavbarItem>
				</NavbarContent>
			</Navbar>
			<section className="min-h-[calc(100dvh-4rem)]">{children}</section>
			<footer className="p-4 border-t dark:border-t-zinc-600">
				<small>
					Powered by{" "}
					<Link href="/" className="text-purple-500 text-base hover:underline">
						Kristall
					</Link>
				</small>
			</footer>
		</>
	);
}
