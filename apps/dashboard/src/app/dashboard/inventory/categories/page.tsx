import { Button, buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { Item, ItemTitle, ItemValue } from "@/components/ui/item";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { getCategories } from "./_adapters";
import AddCategory from "./components/add-category";

export default async function CategoriesPage() {
	const categories = await getCategories();

	return (
		<main className="h-layout overflow-y-scroll">
			<header className="p-4 flex flex-row justify-between items-center">
				<h3 className="text-2xl">Categorías</h3>
				<AddCategory />
			</header>
			<section className="grid grid-cols-3 gap-4 px-4">
				{categories.map((category) => (
					<Card key={category._id}>
						<CardHeader>
							<CardTitle>{category.name}</CardTitle>
						</CardHeader>
						<CardBody className="pt-0">
							<Item>
								<ItemTitle>Productos</ItemTitle>
								<ItemValue>{category.count}</ItemValue>
							</Item>
						</CardBody>
						<CardFooter className="justify-between">
							<Button variant="outline">Editar</Button>
							<Link
								href={`/dashboard/inventory?page=1&category=${category._id}`}
								className={buttonVariants({
									variant: "link",
									className: "flex gap-x-2",
								})}
							>
								Ver inventario
								<ExternalLink className="w-4 h-4" />
							</Link>
						</CardFooter>
					</Card>
				))}
			</section>
		</main>
	);
}
