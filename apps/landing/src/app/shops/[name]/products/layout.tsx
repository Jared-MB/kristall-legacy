import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { CategoryService } from "../services";
import Categories from "./components/filters/categories";
import PriceFilter from "./components/filters/price";
import SortProducts from "./components/filters/sort";

export default async function ProductsLayout(props: { children: React.ReactNode, params: Promise<{ name: string }> }) {
    const params = await props.params;

    const {
        children
    } = props;

    const categories = await new CategoryService().getCategories(params.name)

    return (
        <div className='grid grid-cols-[20dvw_1fr] h-[calc(100dvh-4rem)] py-4'>
            <div className='w-full h-full px-4 py-2'>
                <Card>
                    <CardHeader><h5 className='text-primary text-2xl font-medium'>Filtrar</h5></CardHeader>
                    <Divider />
                    <CardBody className='flex flex-col gap-y-4'>
                        <PriceFilter />
                        <Categories categories={categories ?? []} />
                        <SortProducts />
                    </CardBody>
                </Card>
            </div>
            {children}
        </div>
    )
}
