// import Search from "@/components/search";
// import type { LocationSummary } from "@/types/location";
// import type { CatalogProduct } from "@/types/product";
// import { getHeaders } from "@/utils/auth.utils";
// import { cookies } from "next/headers";
// import ProductImage from "./components/product-image";
// import SelectLocations from "./components/select-locations";
// import ShoppingCart from "./components/shopping-cart";
// import ShoppingCartSummary from "./components/shopping-cart-summary";

import UnderConstruction from "@/components/pages/under-construction";

// const getLocations = async (): Promise<LocationSummary[] | null> => {
// 	const session = cookies().get("session");

// 	if (!session) {
// 		return null;
// 	}

// 	const headers = getHeaders(session.value);

// 	if (!headers) {
// 		return null;
// 	}

// 	const response = await fetch(`${process.env.SERVER_API}/locations`, {
// 		method: "GET",
// 		headers,
// 	});
// 	const { data } = await response.json();
// 	return data;
// };

// const getProducts = async (
// 	searchParams: URLSearchParams,
// ): Promise<CatalogProduct[] | null> => {
// 	const session = cookies().get("session");

// 	if (!session) {
// 		return null;
// 	}

// 	const headers = getHeaders(session.value);

// 	if (!headers) {
// 		return null;
// 	}

// 	const search = new URLSearchParams(searchParams).toString();

// 	const response = await fetch(
// 		`${process.env.SERVER_API}/products/by-location?${search}&take=15`,
// 		{
// 			method: "GET",
// 			headers,
// 			next: {
// 				tags: ["location-products"],
// 			},
// 		},
// 	);

// 	const { data } = await response.json();
// 	return data;
// };

// export default async function SalesPage({
// 	searchParams,
// }: {
// 	searchParams: URLSearchParams;
// }) {
// 	const locations = await getLocations();
// 	const products = await getProducts(searchParams);

// 	if (!locations || !products) {
// 		return null;
// 	}

// 	return (
// 		<main>
// 			<header className="flex items-center gap-x-4 m-8 h-[3.75rem]">
// 				<Search queryName="name" />
// 				<SelectLocations locations={locations} />
// 			</header>
// 			<div className="grid grid-cols-[1fr_auto] h-[calc(100dvh-11.75rem)] pl-8 border-t border-t-zinc-700">
// 				<section className="p-4 pl-0 w-full overflow-y-auto grid grid-cols-5 max-h-full place-items-stretch items-start gap-y-8 gap-x-5">
// 					{products.map((product) => (
// 						<div
// 							key={product._id}
// 							className="flex flex-col justify-center h-fit"
// 						>
// 							<ProductImage product={product} />
// 							<div className="grid grid-cols-[75%_1fr]">
// 								<h3 className="truncate">{product.name}</h3>
// 								<small className="text-sm text-zinc-400 h-full flex justify-end items-center">
// 									{product.stock}
// 								</small>
// 							</div>
// 							<span className="text-end">${product.price}</span>
// 						</div>
// 					))}
// 				</section>
// 				<aside className="md:w-[272px] border-l border-l-zinc-700 max-h-full p-4 pr-0 flex flex-col">
// 					<header className="mb-4">
// 						<h3 className="text-xl font-medium">Carrito de compras</h3>
// 					</header>
// 					<ShoppingCart />
// 					<ShoppingCartSummary />
// 				</aside>
// 			</div>
// 		</main>
// 	);
// }

export default async function SalesPage() {
	return (
		<UnderConstruction
			value={90}
			link="https://pos.kristall.app"
			target="_blank"
		/>
		// <iframe
		// 	src="http://localhost:3003"
		// 	title="Sales"
		// 	className="w-full h-full"
		// />
	);
}
