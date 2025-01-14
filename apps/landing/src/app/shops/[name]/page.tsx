import type { PublicPage } from "@/types/PublicPage";
import {
	getPublicBestSellers,
	getPublicNewProducts,
} from "@kristall/core/products/public";
import { Button } from "@kristall/ui/button";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import BannerImage from "./components/banner-image";
import ProductsCarousel from "./components/products-carousel";

interface Props {
	params: Promise<{
		name: string;
	}>;
}

async function getPublicPageConfig(
	shopName: string,
): Promise<PublicPage | null> {
	try {
		const response = await axios.get(
			`${process.env.SERVER_API}/shops/public/${shopName}/config`,
		);
		return response.data.data;
	} catch (error) {
		if (error instanceof AxiosError) {
			return null;
		}
		return null;
	}
}

export default async function ShopId(props: Props) {
	const params = await props.params;
	const config = await getPublicPageConfig(params.name);

	return (
		<div className="flex flex-col items-center justify-center ">
			<section className="flex justify-evenly h-[50dvh] w-full">
				<header className="flex flex-col justify-center gap-y-10 items-start">
					<h2 className="text-4xl text-primary text-balance max-w-[28ch]">
						{config?.title ?? "Bienvenido de vuelta"}
					</h2>
					<Button asChild>
						<Link href={`${params.name}/products`}>Ver productos</Link>
					</Button>
				</header>
				<div className="grid place-content-center h-full">
					{!config?.bannerImage?.url ? (
						<BannerImage className="h-[40dvh] w-auto aspect-video object-contain" />
					) : (
						<Image
							className="h-[40dvh] w-auto"
							src={config.bannerImage.url}
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
					fetcher={() => getPublicBestSellers(params.name)}
					shopName={params.name}
				/>
			</div>
			<div className="w-full grid place-content-center pt-6 pb-7">
				<ProductsCarousel
					title="Nuevos productos"
					fetcher={() => getPublicNewProducts(params.name)}
					shopName={params.name}
				/>
			</div>
		</div>
	);
}
