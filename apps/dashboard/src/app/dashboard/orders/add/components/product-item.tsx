"use client";

import type { OrderProduct } from "@kristall/core/interfaces/products";

import { Badge } from "@kristall/ui/badge";
import { Button } from "@kristall/ui/button";
import { NoImage } from "@kristall/ui/svg/no-image";

import { Plus } from "lucide-react";

import { useViewStore } from "./products-view";

import { useShoppingCart } from "./shopping-cart";

export function ProductItem({ product }: { product: OrderProduct }) {
	const view = useViewStore((state) => state.view);

	if (view === "list") {
		return <ProductItemList product={product} />;
	}

	return <ProductItemGrid product={product} />;
}

function ProductItemList({ product }: { product: OrderProduct }) {
	const addProductToCart = useShoppingCart((state) => state.addProduct);

	return (
		<article className="grid grid-cols-[auto_1fr] gap-x-4 border border-border rounded-md p-4">
			<div className="size-32 overflow-hidden rounded-lg">
				{product?.image?.url ? (
					<img
						src={product.image?.url}
						alt={product.name}
						className="size-32 object-cover bg-no-repeat bg-center"
					/>
				) : (
					<NoImage className="size-32" />
				)}
			</div>
			<div className="flex justify-between">
				<div>
					<h4 className="text-xl font-medium">{product.name}</h4>
					<div>
						<span>{product.stock}</span>
					</div>
				</div>
				<div className="flex flex-col gap-x-4 justify-between items-end">
					<span className="text-2xl">${product.price}</span>
					<Button onClick={() => addProductToCart({ ...product, quantity: 1 })}>
						<Plus className="mr-2" />
						Agregar
					</Button>
				</div>
			</div>
		</article>
	);
}

function ProductItemGrid({ product }: { product: OrderProduct }) {
	const addProductToCart = useShoppingCart((state) => state.addProduct);

	return (
		<article className="flex flex-col gap-y-2">
			<div className="h-48 w-full overflow-hidden rounded-lg">
				{product?.image?.url ? (
					<img
						src={product.image?.url}
						alt={product.name}
						className="h-48 w-full object-cover bg-no-repeat bg-center hover:scale-105 transition-transform duration-200"
					/>
				) : (
					<NoImage className="hover:scale-105 h-48 w-full transition-transform duration-200" />
				)}
			</div>
			<div className="flex flex-col gap-y-1">
				<h4 className="text-lg font-medium truncate" title={product.name}>
					{product.name}
				</h4>
				<div className="flex justify-between items-center">
					<div className="flex gap-1 items-center">
						<small>Stock:</small>
						<span className="font-medium">{product.stock}</span>
					</div>
					<Badge className="truncate" variant="outline">
						{product.category?.name}
					</Badge>
				</div>
			</div>
			<Button onClick={() => addProductToCart({ ...product, quantity: 1 })}>
				<Plus className="mr-2" />
				Agregar
			</Button>
		</article>
	);
}
