import type { PublicProduct } from "@kristall/core/interfaces/products";
import Link from "next/link";
import EmptyImage from "./empty-image";

export function ProductCard({
	category,
	image,
	price,
	name,
	shopName,
	_id,
}: PublicProduct & { shopName: string }) {
	return (
		<article className="pb-4 space-y-3 w-[225px]">
			<div>
				<Link
					href={`/shops/${shopName}/products/${_id}`}
					className="overflow-hidden rounded-md inline-block w-full"
				>
					{!image?.url ? (
						<div className="w-full grid place-content-center">
							<EmptyImage className="h-auto w-48 object-cover transition-all hover:scale-105 aspect-[3/4]" />
						</div>
					) : (
						<img
							src={image.url}
							alt={`Imagen del producto ${name}`}
							className="h-auto w-auto object-cover object-center transition-all hover:scale-105 aspect-[3/4]"
						/>
					)}
				</Link>
			</div>
			<header className="text-sm space-y-1">
				<h4 title={name} className="font-semibold leading-none hover:underline">
					<Link href={`/shops/${shopName}/products/${_id}`}>{name}</Link>
				</h4>
				<p className="text-muted-foreground">${price}</p>
			</header>
		</article>
	);
}
