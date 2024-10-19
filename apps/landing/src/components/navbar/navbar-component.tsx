import { NavigationMenu } from "@/components/ui/navigation-menu";
import Link from "next/link";
import NavbarDesktop from "./navbar-desktop";
import NavbarMobile from "./navbar-mobile";

export default function Navbar() {
	return (
		<header className="dark:bg-zinc-900 dark:text-zinc-300 px-8 flex items-center justify-between md:justify-evenly h-16 shadow fixed w-full bg-zinc-900 z-50">
			<div>
				<h1>
					<Link href="/" className="text-purple-500 text-4xl">
						Kristall
					</Link>
				</h1>
			</div>
			<NavigationMenu>
				<NavbarMobile />
				<NavbarDesktop />
			</NavigationMenu>
		</header>
	);
}
