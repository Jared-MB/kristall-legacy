import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { forwardRef } from "react";

const ListItem = forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a"> & {
		icon?: React.ReactNode;
		available?: boolean;
	}
>(
	(
		{ className, title, children, href, icon, available = true, ...props },
		ref,
	) => {
		let to = href ?? "";
		if (available) {
			to = "";
		}

		return (
			<li>
				<NavigationMenuLink asChild>
					<Link
						ref={ref}
						href={to}
						className={cn(
							"select-none flex flex-col gap-y-1 w-full rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
							className,
							available
								? "cursor-pointer"
								: "text-muted-foreground pointer-events-none",
						)}
						{...props}
					>
						<h3 className="text-sm font-medium leading-none flex flex-row gap-x-2 items-center">
							{icon}
							{title}
						</h3>
						<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
							{children}
						</p>
						{!available && (
							<small className="text-zinc-300 font-semibold mt-1">
								Próximamente
							</small>
						)}
					</Link>
				</NavigationMenuLink>
			</li>
		);
	},
);

export { ListItem };
