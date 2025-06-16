import {
	getPublicBestSellersProducts,
	getPublicNewestProducts,
} from "@kristall/core/products/public";
import { getVirtualShowroomConfig } from "@kristall/core/virtual-showroom/data";
import { Button } from "@kristall/ui/button";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BannerImage from "./components/banner-image";
import ProductsCarousel from "./components/products-carousel";

interface Props {
	params: Promise<{
		name: string;
	}>;
}

export default async function ShopId(props: Props) {
	const params = await props.params;
	const virtualShowroom = await getVirtualShowroomConfig(params.name);

	if (!virtualShowroom) {
		notFound();
	}

	const { virtualShowroomConfig: config } = virtualShowroom;

	const [bestSellers, newProducts] = await Promise.all([
		getPublicBestSellersProducts(params.name),
		getPublicNewestProducts(params.name),
	]);

	return (
		<div className="flex flex-col items-center justify-center ">
			<section className="flex justify-evenly h-[50dvh] w-full">
				<header className="flex flex-col justify-center gap-y-10 items-start">
					<h2 className="text-4xl text-primary text-balance max-w-[28ch]">
						{config.cardTitle ?? "Bienvenido de vuelta"}
					</h2>
					<Button asChild>
						<Link href={`${params.name}/products?sort-by=best-sellers`}>
							Ver productos
						</Link>
					</Button>
				</header>
				<div className="grid place-content-center h-full">
					{!config.cardImageOne?.url ? (
						<BannerImage className="h-[40dvh] w-auto aspect-video object-contain" />
					) : (
						<Image
							className="h-[40dvh] w-auto"
							src={config.cardImageOne.url}
							alt={`Imagen para la página principal de productos de ${params.name}`}
							layout="fill"
							objectFit="cover"
						/>
					)}
				</div>
			</section>
			<div className="bg-zinc-100 dark:bg-zinc-900/80 w-full grid place-content-center pt-6 pb-7">
				<ProductsCarousel
					title="Más vendidos"
					href={`/shops/${params.name}/products?sort-by=best-sellers`}
					products={bestSellers.entities}
					shopName={params.name}
				/>
			</div>
			<div className="w-full grid place-content-center pt-6 pb-7">
				<ProductsCarousel
					title="Nuevos productos"
					href={`/shops/${params.name}/products?sort-by=newest`}
					products={newProducts.entities}
					shopName={params.name}
				/>
			</div>
		</div>
	);
}
