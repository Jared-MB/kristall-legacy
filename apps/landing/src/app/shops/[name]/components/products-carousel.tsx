import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import type { PublicProduct } from "@kristall/core/interfaces/products";
import Link from "next/link";
import { ProductCard } from "./card";

interface Props {
	products: PublicProduct[];
	title: string;
	shopName: string;
	href: `/shops/${string}/products${string}`;
}

export default function ProductsCarousel({
	products,
	title,
	href,
	shopName,
}: Props) {
	return (
		<div className="flex flex-col gap-y-4">
			<div className="flex justify-between items-center">
				<h3 className="text-3xl font-medium text-primary">{title}</h3>
				<small>
					<Link
						href={href}
						prefetch
						className="text-primary text-sm hover:underline"
					>
						Ver todos
					</Link>
				</small>
			</div>
			<Carousel
				opts={{
					align: "center",
					loop: true,
					active: true,
				}}
				className="w-[90dvw]"
			>
				<CarouselContent className="p-1">
					{Array.isArray(products) &&
						products.map((product) => (
							<CarouselItem
								key={product._id}
								className="md:basis-1/2 lg:basis-1/5"
							>
								<ProductCard {...product} shopName={shopName} />
							</CarouselItem>
						))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	);
}
