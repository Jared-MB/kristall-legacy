import { getCategoriesDetails } from "@kristall/client/services/product-catalog/use-cases/private/get-categories-details";

import { AddCategoryCard } from "./add-category";
import { Category, CategorySkeleton } from "./category";

export async function Categories() {
	const categories = await getCategoriesDetails();

	return (
		<>
			<AddCategoryCard />
			{categories.map((category) => (
				<Category key={category._id} category={category} />
			))}
		</>
	);
}

export function CategoriesSkeleton() {
	return (
		<>
			<div className="absolute inset-0 h-full max-h-dvh w-full bg-gradient-to-b from-transparent to-85% to-zinc-900/95 z-50" />
			<AddCategoryCard disabled />
			{Array.from({ length: 6 }).map((_, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: No need for a key here since its only for skeleton
				<CategorySkeleton key={index} />
			))}
		</>
	);
}
