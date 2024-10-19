import Search from "@/components/functional/search";
import { getProductsByLocation } from "@/core/services/product";
import { format } from "@formkit/tempo";
import ProductButton from "./components/product-button";
import ShoppingCart from "./components/shopping-cart";
import ShoppingCartResume from "./components/shopping-cart-resume";

export default async function Home({
	searchParams,
}: {
	searchParams: Readonly<URLSearchParams>;
}) {
	const products = await getProductsByLocation(searchParams);

	return (
		<main className="grid grid-cols-[1fr_25dvw] h-layout">
			<section className="overflow-y-scroll my-8 px-8 grid grid-cols-5 grid-rows-[auto_minmax(auto)] place-content-start gap-6">
				<header className="col-span-5 flex justify-between items-center relative z-10">
					<h2 className="text-3xl font-medium">Productos</h2>
					<div className="w-1/3 relative my-1">
						<Search queryName="name" />
					</div>
				</header>
				{products.map((product) => (
					<article
						key={product._id}
						className="flex flex-col justify-center h-fit"
					>
						<ProductButton product={product} />
						<div className="grid grid-cols-[75%_1fr]">
							<h3 className="truncate">{product.name}</h3>
							<small className="text-sm text-zinc-400 h-full flex justify-end items-center">
								{product.stock}
							</small>
						</div>
						<span className="text-end">${product.price}</span>
					</article>
				))}
			</section>
			<aside className="p-8 grid grid-rows-[auto_1fr_auto]">
				<header>
					<h2 className="text-3xl font-medium">Shopping Cart</h2>
					<div className="flex justify-between items-center text-zinc-400">
						<small>{format(new Date())}</small>
						<small className="text-base">#910</small>
					</div>
				</header>
				<ShoppingCart />
				<ShoppingCartResume />
			</aside>
		</main>
	);
}
