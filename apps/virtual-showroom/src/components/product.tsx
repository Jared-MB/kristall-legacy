"use client";

// import { unstable_ViewTransition as ViewTransition } from "react";

import type { PublicProduct } from "@kristall/core/interfaces/products";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { NoImage } from "./no-image";

export function Product({ product }: { product: PublicProduct }) {
	const searchParams = useSearchParams();

	return (
		<Link
			href={`/products/${product._id}`}
			onNavigate={() =>
				window.localStorage.setItem("previous-query", searchParams.toString())
			}
		>
			<article className="h-auto max-w-full rounded-lg flex flex-col gap-1">
				<div className="overflow-hidden rounded-lg">
					{/* <ViewTransition name={`product-${product._id}-image`}> */}
						{product?.image?.url ? (
							<img
								className="h-auto max-w-full hover:scale-105 duration-300"
								src={product?.image?.url}
								alt={product.name}
								loading="lazy"
							/>
						) : (
							<div className="h-auto max-w-full hover:scale-105 duration-300">
								<NoImage />
							</div>
						)}
					{/* </ViewTransition> */}
				</div>
				<div>
					{/* <ViewTransition name={`product-${product._id}-info`}> */}
						<h3 className="font-bold text-lg">{product.name}</h3>
						<p>${product.price}</p>
					{/* </ViewTransition> */}
				</div>
			</article>
		</Link>
	);
}
