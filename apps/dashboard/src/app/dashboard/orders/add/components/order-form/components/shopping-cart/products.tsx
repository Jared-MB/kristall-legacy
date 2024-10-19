"use client";

import ProductImage from "@/app/dashboard/sales/components/product-image";
import Svg from "@/components/svg";
import LocationSearchSvg from "@/components/svg/location-search-svg";
import { useOrderContext } from "../../../../_context";

export default function ShoppingCardProducts() {
	// const searchParams = useSearchParams();

	// const [prevSearchParams, setPrevSearchParams] = useState(
	// 	new URLSearchParams(searchParams),
	// );

	const { products } = useOrderContext();

	// useEffect(() => {
	// 	const newSearchParams = new URLSearchParams(searchParams);
	// 	const prevLocation = prevSearchParams.get("location");
	// 	const newLocation = newSearchParams.get("location");

	// 	const prevName = prevSearchParams.get("name");
	// 	const newName = newSearchParams.get("name");
	// 	if (prevLocation !== newLocation || prevName !== newName) {
	// 		setPrevSearchParams(newSearchParams);
	// 	}
	// }, [searchParams]);

	return (
		<section className="p-4 pl-0 w-full overflow-y-auto grid grid-cols-5 max-h-full place-items-stretch items-start gap-y-8 gap-x-5">
			{products?.length === 0 ? (
				<div className="col-span-5 flex flex-col gap-y-8 pt-8 text-center">
					<Svg className="h-32">
						<LocationSearchSvg />
					</Svg>
					<span className="text-zinc-400">No hay productos que mostrar</span>
				</div>
			) : (
				products?.map((product: any) => (
					<article
						key={product._id}
						className="flex flex-col justify-center h-fit"
					>
						<ProductImage product={product} />
						<div className="grid grid-cols-[75%_1fr]">
							<h3 className="truncate">{product.name}</h3>
							<small className="text-sm text-zinc-400 h-full flex justify-end items-center">
								{product.stock}
							</small>
						</div>
						<span className="text-end">${product.price}</span>
					</article>
				))
			)}
		</section>
	);
}
