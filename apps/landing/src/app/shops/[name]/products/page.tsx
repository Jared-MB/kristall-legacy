import { getPublicProducts } from "@kristall/core/products/public";
import { SidebarProvider } from "@kristall/ui/sidebar";
import { notFound } from "next/navigation";
import { ProductCard } from "../components/card";
import { ProductsPagination } from "./components/products-pagination";
import { ProductsSidebar } from "./components/products-sidebar";

export default async function ProductPage(props: {
	params: Promise<{ name: string }>;
	searchParams: Promise<Readonly<URLSearchParams>>;
}) {
	const params = await props.params;
	const searchParams = await props.searchParams;

	const pagination = await getPublicProducts(params.name, searchParams);

	if (!pagination?.entities) {
		notFound();
	}

	const {
		entities: products,
		page,
		totalPages,
		hasMore,
		previous,
	} = pagination;

	return (
		<SidebarProvider>
			<ProductsSidebar shopName={params.name} />
			<div className="overflow-y-auto py-4 w-full">
				<div className="flex gap-x-4 flex-wrap pl-4">
					{products?.map((product) => (
						<ProductCard
							key={product._id}
							{...product}
							shopName={params.name}
						/>
					))}
				</div>
				<ProductsPagination
					page={page}
					totalPages={totalPages}
					hasMore={hasMore}
					previous={previous}
				/>
			</div>
		</SidebarProvider>
	);
}
