import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Product } from "@/types";
import Link from "next/link";
import Card from "./card";

interface Props {
    fetcher: () => Promise<Product[] | null>,
    title: string,
    shopName: string
}

export default async function ProductsCarousel({
    fetcher,
    title,
    shopName
}: Props) {

    const products = await fetcher()

    return (
        <div className='flex flex-col gap-y-4'>
            <div className='flex justify-between items-center'>
                <h3 className='text-3xl font-medium text-primary'>{title}</h3>
                <small>
                    <Link href={`/shops/${shopName}/products`} className='text-primary text-sm hover:underline'>Ver todos</Link>
                </small>
            </div>
            <Carousel opts={{
                align: "center",
                loop: true,
                active: true
            }}
                className="w-[90dvw]">
                <CarouselContent className='p-1'>
                    {Array.isArray(products) && products.map(product => (
                        <CarouselItem key={product._id} className="md:basis-1/2 lg:basis-1/5">
                            <Card {...product} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}
