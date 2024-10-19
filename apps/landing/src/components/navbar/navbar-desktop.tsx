import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import Divider from "../ui/divider";
import {
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { kanban, kristallPOS, virtualShowroom } from "./items";
import { ListItem } from "./list-item";

export default function NavbarDesktop() {
	return (
		<NavigationMenuList className="hidden md:flex gap-x-2">
			<NavigationMenuItem>
				<Link href="/track-order" legacyBehavior passHref>
					<NavigationMenuLink
						className={cn(
							navigationMenuTriggerStyle(),
							buttonVariants({
								variant: "outline",
							}),
						)}
					>
						Rastrear pedido
					</NavigationMenuLink>
				</Link>
			</NavigationMenuItem>
			<NavigationMenuItem>
				<NavigationMenuTrigger>Productos</NavigationMenuTrigger>
				<NavigationMenuContent>
					<div className="w-[500px] md:w-[600px] lg:w-[700px]">
						<section className="flex flex-col gap-y-2 p-4">
							<h4 className="text-muted-foreground text-sm font-medium">
								Kristall POS
							</h4>
							<ul className="grid gap-3 md:grid-cols-2 w-full">
								{kristallPOS.map((item) => (
									<ListItem
										key={item.title}
										icon={item.icon}
										href={item.href}
										title={item.title}
										available={item?.available}
									>
										{item.description}
									</ListItem>
								))}
							</ul>
						</section>
						<Divider className="border-zinc-800" />
						<section className="flex flex-col gap-y-2 p-4">
							<h4 className="text-muted-foreground text-sm font-medium">
								Virtual Showroom
							</h4>
							<ul className="grid gap-3 md:grid-cols-2 w-full">
								{virtualShowroom.map((item) => (
									<ListItem
										key={item.title}
										icon={item.icon}
										href={item.href}
										title={item.title}
										available={item?.available}
									>
										{item.description}
									</ListItem>
								))}
							</ul>
						</section>
						<Divider className="border-zinc-800" />
						<section className="flex flex-col gap-y-2 p-4">
							<h4 className="text-muted-foreground text-sm font-medium">
								Kanban
							</h4>
							<ul className="grid gap-3 md:grid-cols-2 w-full">
								{kanban.map((item) => (
									<ListItem
										key={item.title}
										icon={item.icon}
										href={item.href}
										title={item.title}
										available={item?.available}
									>
										{item.description}
									</ListItem>
								))}
							</ul>
						</section>
					</div>
				</NavigationMenuContent>
			</NavigationMenuItem>
			{/* <NavigationMenuItem>
				<NavigationMenuTrigger>Soluciones</NavigationMenuTrigger>
				<NavigationMenuContent>
					<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
						{kristallPOS.map((item) => (
							<ListItem
								key={item.title}
								icon={item.icon}
								href={item.href}
								title={item.title}
							>
								{item.description}
							</ListItem>
						))}
					</ul>
				</NavigationMenuContent>
			</NavigationMenuItem> */}
			<NavigationMenuItem>
				<Link href="/pricing" legacyBehavior passHref>
					<NavigationMenuLink className={navigationMenuTriggerStyle()}>
						Precios
					</NavigationMenuLink>
				</Link>
			</NavigationMenuItem>
			<NavigationMenuItem>
				<Link
					href={`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/login`}
					target="_blank"
					legacyBehavior
					passHref
				>
					<NavigationMenuLink className={navigationMenuTriggerStyle()}>
						Iniciar sesión
					</NavigationMenuLink>
				</Link>
			</NavigationMenuItem>
			<NavigationMenuItem>
				<Link href="/pricing" legacyBehavior passHref>
					<NavigationMenuLink
						className={buttonVariants({
							variant: "default",
						})}
					>
						Registrarse
					</NavigationMenuLink>
				</Link>
			</NavigationMenuItem>
		</NavigationMenuList>
	);
}
