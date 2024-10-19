import type { Product } from "@/types";
import { Button, Card, CardBody, CardFooter, CardHeader, Image } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";
import EmptyImage from "./empty-image";

export default function CustomCard({ category, image, size, price, name, showBadge = true }: Product & { size?: 'sm' | 'md' | 'lg', showBadge?: boolean }) {
    return (
        <Card shadow="sm" className='w-fit h-full flex flex-col '>
            <CardHeader className="relative shadow-black/5 rounded-large">
                <div className='relative overflow-hidden rounded-large '>
                    {
                        !image?.url ? <EmptyImage className={twMerge('object-contain', size === 'md' ? 'h-48 w-48' : 'h-56 w-56')} /> : <Image src={image.url} alt={`Imagen del producto ${name}`} className={
                            twMerge('relative z-10 shadow-black/5 object-center duration-300 rounded-large aspect-square hover:scale-110 object-cover', size === 'md' ? 'h-48 w-48' : 'w-56')
                        } />
                    }
                </div>
            </CardHeader>
            <CardBody className='py-0'>
                <div className='flex items-start justify-between'>
                    <h4 className='capitalize font-medium text-lg text-zinc-600 dark:text-zinc-300 inline-block'>{name}</h4>
                    {category?.name && <small className='bg-primary rounded-full border-2 text-xs px-1 border-purple-700 text-white'>{category?.name} </small>}
                </div>
                <span className='text-zinc-600/70 dark:text-zinc-300/70  text-base'>${price}</span>
            </CardBody>
            <CardFooter>
                <Button className='bg-primary rounded-lg text-white'>
                    Ver disponibilidad
                </Button>
            </CardFooter>
        </Card>
    )
}
