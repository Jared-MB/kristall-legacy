import type { Category } from "@kristall/core/interfaces/categories";

import { getPublicCategories } from "@kristall/core/categories/public";
import { Label } from "@kristall/ui/label";
import { RadioGroup, RadioGroupItem } from "@kristall/ui/radio-group";
import { Skeleton } from "@kristall/ui/skeleton";
import { Categories } from "./categories";

function CategoryItem({
	category,
	children,
}: { category: Category; children?: React.ReactNode }) {
	return (
		<div className="flex items-center space-x-2">
			<RadioGroupItem value={category.name} id={category._id} />
			<Label htmlFor={category._id}>{children ?? category.name}</Label>
		</div>
	);
}

export async function CategoriesFilter({ shopName }: { shopName: string }) {
	const categories = await getPublicCategories(shopName);

	return (
		<Categories>
			{categories?.map((category) => (
				<CategoryItem key={category._id} category={category} />
			))}
		</Categories>
	);
}

export function CategoriesFilterSkeleton() {
	return (
		<RadioGroup>
			{Array.from({ length: 5 }).map((_, index) => (
				<CategoryItem
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					key={index}
					category={{ _id: index.toString(), name: "" }}
				>
					<Skeleton className="w-16 h-4 rounded-md" />
				</CategoryItem>
			))}
		</RadioGroup>
	);
}
