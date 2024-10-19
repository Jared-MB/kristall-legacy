import type { Product } from "@/types";
import { PublicPage } from "@/types/PublicPage";
import { Button } from "@nextui-org/react";
import axios, { AxiosError } from "axios";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BannerImage from "./components/banner-image";
import ProductsCarousel from "./components/products-carousel";
import { ProductService } from "./services";

interface Props {
	params: {
		name: string;
	};
}

async function getPublicProducts(shopName: string): Promise<Product[] | null> {
	try {
		const response = await axios.get(
			`${process.env.SERVER_API}/shops/public/${shopName}/products/?take=10&skip=0`,
		);
		return response.data.data;
	} catch (error) {
		if (error instanceof AxiosError) {
			return null;
		}
		return null;
	}
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

async function getShopImage(shopName: string): Promise<string | null> {
	try {
		const response = await axios.get(
			`${process.env.SERVER_API}/shops/public/${shopName}/image`,
		);
		return response.data.data;
	} catch (error) {
		return null;
	}
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const image = await getShopImage(params.name);
	return {
		title: params.name[0].toUpperCase() + params.name.slice(1),
		description: `Productos de ${params.name}`,
		icons: {
			icon: image ?? "/favicon.ico",
		},
	};
}

export default async function ShopId({ params }: Props) {
	const config = await getPublicPageConfig(params.name);

	return (
		<div className="flex flex-col items-center justify-center ">
			<article className="flex justify-evenly h-[50dvh] w-full">
				<header className="flex flex-col justify-center gap-y-10 items-start">
					<h2 className="text-4xl text-primary text-balance max-w-[28ch]">
						{config?.title ?? "Bienvenido de vuelta"}
					</h2>
					<Button
						as={Link}
						href={`${params.name}/products`}
						className="bg-primary rounded-lg mb-1 text-white"
					>
						Ver productos
					</Button>
				</header>
				<picture className="grid place-content-center h-full">
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
				</picture>
			</article>
			<div className="bg-zinc-100 dark:bg-zinc-800 w-full grid place-content-center pt-6 pb-7">
				<ProductsCarousel
					title="Más vendidos"
					fetcher={() => new ProductService().getBestSellers(params.name)}
					shopName={params.name}
				/>
			</div>
			<div className="w-full grid place-content-center pt-6 pb-7">
				<ProductsCarousel
					title="Nuevos productos"
					fetcher={() => new ProductService().getNewest(params.name)}
					shopName={params.name}
				/>
			</div>
		</div>
	);
}
