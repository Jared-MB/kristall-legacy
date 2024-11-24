import { Card, Input, Pagination } from "@nextui-org/react"
import { Search } from "lucide-react"
import CustomCard from "../components/card"
import { ProductService } from "../services"

export default async function ProductPage(props: { params: Promise<{ name: string }> }) {
    const params = await props.params;

    const products = await new ProductService().getProducts(params.name)

    return (
        <div className='mt-2'>
            <Card className='ml-4 mr-8  p-2 flex flex-row items-center justify-between'>
                <h5 className='text-primary text-2xl font-medium'>Productos</h5>
                <div>
                    <Input startContent={<Search className='text-zinc-500' />} label='Buscar' placeholder="Producto..." className='max-w-sm' radius="md" variant="bordered" size="sm" labelPlacement="outside-left" />
                </div>
            </Card>
            <div className='overflow-y-scroll h-[calc(100dvh-10rem)] px-4 py-2 my-2'>
                <div className='grid grid-cols-5 gap-4'>
                    {products?.map(product => (
                        <CustomCard key={product._id} {...product} size='md' showBadge={false} />
                    ))}

                </div>
                <Pagination total={10} initialPage={1} className='mx-auto w-fit mt-6' />
            </div>
        </div>
    )
}
