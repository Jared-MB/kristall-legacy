import { Suspense } from "react";

import { MainContent } from "@kristall/ui/layout/main-content";

import { AddCategory } from "./components/add-category";
import { Categories, CategoriesSkeleton } from "./components/categories";

export const dynamic = "force-dynamic";

export default function CategoriesPage() {
	return (
		<MainContent>
			<header className="flex flex-row justify-between items-center pb-4">
				<h3 className="text-2xl">Categorías</h3>
				<AddCategory />
			</header>
			<section className="grid grid-cols-3 gap-4">
				<Suspense fallback={<CategoriesSkeleton />}>
					<Categories />
				</Suspense>
			</section>
		</MainContent>
	);
}
