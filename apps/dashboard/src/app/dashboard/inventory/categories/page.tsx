import { Suspense } from "react";

import { MainContent } from "@kristall/ui/layout/main-content";

import { AddCategoryButton } from "./components/add-category";
import { Categories, CategoriesSkeleton } from "./components/categories";
import {
	CategoriesDisplay,
	ChangeCategoriesDisplayMode,
} from "./components/categories-display";

export const dynamic = "force-dynamic";

export default function CategoriesPage() {
	return (
		<MainContent>
			<header className="flex flex-row justify-between items-center pb-4">
				<div>
					<h3 className="text-3xl font-medium">Categorías</h3>
					<p className="text-zinc-400 text-sm mt-2">
						Gestiona las categorías de productos
					</p>
				</div>
				<div className="flex gap-4 items-center">
					<ChangeCategoriesDisplayMode />
					<AddCategoryButton />
				</div>
			</header>
			<CategoriesDisplay>
				<Suspense fallback={<CategoriesSkeleton />}>
					<Categories />
				</Suspense>
			</CategoriesDisplay>
		</MainContent>
	);
}
