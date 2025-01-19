import ThemeSwitcher from "@/components/theme-switcher";
import { Button } from "@kristall/ui/button";
import axios from "axios";
import type { Metadata } from "next";
import Link from "next/link";

interface Props {
	params: Promise<{
		name: string;
	}>;
}

async function getShopImage(shopName: string): Promise<string | null> {
	try {
		const response = await axios.get(
			`${process.env.SERVER_API}/shops/public/${shopName}/image`,
		);
		return response.data.data;
	} catch (error) {
		return null;
	}
}

export async function generateMetadata(props: Props): Promise<Metadata> {
	const params = await props.params;
	const image = await getShopImage(params.name);
	return {
		title: params.name[0].toUpperCase() + params.name.slice(1),
		description: `Productos de ${params.name}`,
		icons: {
			icon: image ?? "/favicon.ico",
		},
	};
}

export default async function ShopsLayout(props: {
	params: Promise<{ name: string }>;
	children: React.ReactNode;
}) {
	const params = await props.params;

	const { children } = props;

	return (
		<div>
			<header className="h-16 flex justify-between items-center px-8 sticky top-0 z-50 bg-background">
				<div className="flex items-center gap-x-4">
					<h2>
						<Link href="/" className="text-purple-500 text-2xl font-light">
							Kristall
						</Link>
					</h2>
					<span aria-hidden>|</span>
					<h1 className="capitalize text-3xl font-light">
						<Link href={`/shops/${params.name}`}>
							{params.name.replace("%20", " ")}
						</Link>
					</h1>
				</div>
				<div className="flex items-center gap-x-4">
					<nav>
						<Button asChild variant="outline">
							<Link
								href={`/shops/${params.name}/products?sort-by=best-sellers`}
							>
								Productos
							</Link>
						</Button>
					</nav>
					<ThemeSwitcher />
				</div>
			</header>
			<div>{children}</div>
		</div>
	);
}
