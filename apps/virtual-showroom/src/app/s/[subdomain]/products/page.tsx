import { Header } from "@/components/header";
import { Product } from "@/components/product";
import { distributeToColumnsArray } from "@/lib/utils";

import { getPublicCategories } from "@kristall/core/categories/public";
import { getPublicProducts } from "@kristall/core/products/public";
import { Search } from "@kristall/ui/functional/search";
import { SearchSelect } from "@kristall/ui/functional/search-select";
import {
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@kristall/ui/select";
import { notFound } from "next/navigation";
import { Footer } from "./footer";

export default async function ProductsPage({
	params,
	searchParams,
}: {
	params: Promise<{ subdomain: string }>;
	searchParams: Promise<Readonly<URLSearchParams>>;
}) {
	const [{ subdomain }, query] = await Promise.all([params, searchParams]);
	const [shop, categories] = await Promise.all([
		getPublicProducts(subdomain, new URLSearchParams(query)),
		getPublicCategories(subdomain),
	]);

	if (!shop) {
		notFound();
	}

	const products = distributeToColumnsArray(shop.entities, 4);

	return (
		<>
			<Header
				shopName={subdomain}
				className="sticky top-0 bg-white/90 backdrop-blur-lg z-10"
			>
				<div className="flex gap-x-4 items-center">
					<SearchSelect name="category" clearOnValue="k-vs-all">
						<SelectTrigger className="w-[280px]">
							<SelectValue placeholder="Categoría" />
						</SelectTrigger>
						<SelectContent className="bg-white">
							<SelectGroup>
								<SelectLabel>Categoría</SelectLabel>
								<SelectItem value="k-vs-all">Todas</SelectItem>
								{categories.map((category) => (
									<SelectItem key={category._id} value={category.name}>
										{category.name}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</SearchSelect>
					<Search queryName="name" showLabel={false} resetPage />
				</div>
			</Header>
			<div className="grid grid-cols-[20dvw_auto]">
				<aside className="h-[calc(100dvh-5rem)] sticky top-20">Filter</aside>
				<div>
					<section className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
						{products.map((column, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey:
							<div key={index} className="flex flex-col gap-4">
								{column?.map((product) => (
									<Product product={product} key={`product-${product._id}`} />
								))}
							</div>
						))}
					</section>
					<Footer pagination={shop} />
				</div>
			</div>
		</>
	);
}
