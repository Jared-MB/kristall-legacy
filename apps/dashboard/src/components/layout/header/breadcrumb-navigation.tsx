"use client";

import { SECTIONS } from "@/constants/sections";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@kristall/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export default function BreadcrumbNavigation() {
	const pathname = usePathname().split("/");

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{pathname.map((path) => {
					const [before, after] = pathname.join("/").split(path);
					const isLast = after === "";
					const href = before + path;

					if (path === "") return null;
					return (
						<Fragment key={href}>
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link href={href} className="capitalize">
										{(SECTIONS as any)[path.replace("%20", " ")] ??
											path.replace("%20", " ")}
									</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							{!isLast && <BreadcrumbSeparator />}
						</Fragment>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
