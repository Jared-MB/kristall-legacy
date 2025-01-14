"use client";

import type { VirtualShowroom } from "@/actions/virtual-showroom";
import Divider from "@/components/divider";
import Svg from "@/components/svg";
import ShopSvg from "@/components/svg/shop-svg";
import { Button, Card } from "@/components/ui";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/core/utils";
import { Moon } from "lucide-react";

import type { PublicProduct } from "@kristall/core/interfaces/products";
import Autoplay from "embla-carousel-autoplay";

interface Props extends VirtualShowroom {
	name: string;
	isTitleFocused: boolean;
	isBannerFocused: boolean;
	isAlternativeImageFocused: boolean;
	isShowBestSellersFocused: boolean;
	isShowNewFocused: boolean;
	image?: string;
	alternativeImage?: string;
	showBestSellers: boolean;
	showNew: boolean;
	products: PublicProduct[] | null;
	newProducts: PublicProduct[] | null;
}

export default function Preview(config: Props) {
	return (
		<div className="flex flex-col gap-y-2 h-fit sticky top-0 overflow-y-auto">
			<header className="flex flex-row items-center justify-between px-8">
				<div>
					<span className="text-purple-500">Kristall</span> | {config.name}
				</div>
				<div className="flex flex-row gap-x-1 items-center">
					<span className="text-xs text-zinc-300">Productos</span>
					<Button size="icon" variant="ghost" className="w-6 h-6">
						<Moon className="w-3 h-3" />
					</Button>
				</div>
			</header>
			<Divider />
			<div
				className={cn(
					"h-[20dvh] border flex w-full items-center justify-evenly",
					config.isBannerFocused ? "border-zinc-500" : "border-none",
				)}
				style={{
					backgroundImage: `url(${config.image})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					borderRadius: config.image ? "0" : "4px",
				}}
			>
				<div className="flex flex-col max-w-[40%] h-full gap-y-2 items-start justify-center">
					<h2
						className={cn(
							"p-2 rounded transition-colors duration-200 border text-balance text-purple-500",
							config.isTitleFocused ? "border-zinc-500" : "border-none",
						)}
					>
						{config.title ? config.title : "Bienvenido de vuelta"}
					</h2>
					<div className="relative w-full">
						<Button className="top-0 -left-[10%] relative scale-[.65] text-sm">
							Ver productos
						</Button>
					</div>
				</div>
				<div className="max-h-[75%] overflow-hidden flex items-center justify-center">
					<div
						className={cn(
							"flex items-center rounded border h-full",
							config.isAlternativeImageFocused
								? "border-zinc-500"
								: "border-none",
						)}
					>
						{config.alternativeImage ? (
							<img
								src={config.alternativeImage}
								alt="alternative"
								className="w-40 object-cover object-center"
							/>
						) : (
							<Svg className="w-40">
								<ShopSvg />
							</Svg>
						)}
					</div>
				</div>
			</div>
			{config.showBestSellers && (
				<div
					className={cn(
						"flex justify-center w-full  border rounded py-4",
						config.isShowBestSellersFocused ? "border-zinc-500" : "border-none",
					)}
				>
					<div className="flex flex-col gap-y-4">
						<h4 className="text-sm text-purple-500">Productos más vendidos</h4>
						<div className="flex justify-center">
							<Carousel
								opts={{
									loop: true,
								}}
								plugins={[Autoplay()]}
								className="w-[30rem]"
							>
								<CarouselContent>
									{config.products?.map((product) => (
										<CarouselItem key={product._id} className="basis-1/6">
											<Card className="overflow-x-hidden">
												<div className="overflow-hidden rounded">
													<img
														src={product.image?.url}
														alt={product.name}
														className="w-full h-12 object-cover object-center rounded transition-transform hover:scale-105"
													/>
												</div>
												<div className="p-1 flex flex-col">
													<span className="text-xs truncate">
														{product.name}
													</span>
													<span className="text-[8px] text-zinc-300">
														${product.price}
													</span>
													<button
														type="button"
														className="text-[6px] w-fit px-1 bg-purple-500 rounded inline-block mt-1"
													>
														Ver más
													</button>
												</div>
											</Card>
										</CarouselItem>
									))}
								</CarouselContent>
							</Carousel>
						</div>
					</div>
				</div>
			)}
			{config.showNew && (
				<div
					className={cn(
						"flex justify-center w-full  border rounded py-4",
						config.isShowNewFocused ? "border-zinc-500" : "border-none",
					)}
				>
					<div className="flex flex-col gap-y-4">
						<h4 className="text-sm text-purple-500">Productos nuevos</h4>
						<div className="flex justify-center">
							<Carousel
								opts={{
									loop: true,
								}}
								plugins={[Autoplay()]}
								className="w-[30rem]"
							>
								<CarouselContent>
									{config.newProducts?.map((product) => (
										<CarouselItem key={product._id} className="basis-1/6">
											<Card className="overflow-x-hidden">
												<div className="overflow-hidden rounded">
													<img
														src={product.image?.url}
														alt={product.name}
														className="w-full h-12 object-cover object-center rounded transition-transform hover:scale-105"
													/>
												</div>
												<div className="p-1 flex flex-col">
													<span className="text-xs truncate">
														{product.name}
													</span>
													<span className="text-[8px] text-zinc-300">
														${product.price}
													</span>
													<button
														type="button"
														className="text-[6px] w-fit px-1 bg-purple-500 rounded inline-block mt-1"
													>
														Ver más
													</button>
												</div>
											</Card>
										</CarouselItem>
									))}
								</CarouselContent>
							</Carousel>
						</div>
					</div>
				</div>
			)}
			<Divider />
			<footer>
				<small className="text-[10px]">
					Powered by{" "}
					<span className="text-purple-500 hover:underline cursor-pointer">
						Kristall
					</span>
				</small>
			</footer>
		</div>
	);
}
