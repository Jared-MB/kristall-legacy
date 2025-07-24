import type { PrivateCategory } from "@kristall/shared/domains/product-catalog/types/category.private";

import { getCategoriesDetails } from "@kristall/client/services/product-catalog/use-cases/private/get-categories-details";

import { Edit3, ExternalLink, MoreHorizontal, Package } from "lucide-react";
import Link from "next/link";

import { Badge } from "@kristall/ui/badge";
import { Button } from "@kristall/ui/button";
import * as Card from "@kristall/ui/card";
import { Skeleton } from "@kristall/ui/skeleton";

export async function Categories() {
	const categories = await getCategoriesDetails();

	return (
		<>
			{categories.map((category) => (
				<Category key={category._id} category={category} />
			))}
		</>
	);
}

export function CategoriesSkeleton() {
	return (
		<>
			{Array.from({ length: 6 }).map((_, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: No need for a key here since its only for skeleton
				<CategorySkeleton key={index} />
			))}
		</>
	);
}

function Category({ category }: { category: PrivateCategory }) {
	return (
		<Card.Root className="transition-all duration-200 hover:shadow-sm">
			<Card.Header className="pb-4">
				<div className="flex items-center justify-between">
					<h3 className="text-lg font-medium">{category.name}</h3>
					<Button
						variant="ghost"
						size="sm"
						className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
					>
						<MoreHorizontal className="w-4 h-4" />
					</Button>
				</div>
			</Card.Header>
			<Card.Body className="py-0">
				<div className="flex items-center justify-between mb-6">
					<div className="flex items-center text-sm text-gray-600">
						<Package className="w-4 h-4 mr-2" />
						<span>{category.count} productos</span>
					</div>
					<Badge
						variant={category.count > 0 ? "default" : "secondary"}
						className={
							category.count > 0 ? "bg-purple-500 hover:bg-purple-600" : ""
						}
					>
						{category.count > 0 ? "Activa" : "Vacía"}
					</Badge>
				</div>
			</Card.Body>
			<Card.Footer className="flex gap-2">
				<Button variant="outline" size="sm" className="flex-1">
					<Edit3 className="w-4 h-4 mr-2" />
					Editor
				</Button>
				<Button
					variant="ghost"
					size="sm"
					asChild
					className="text-purple-500 hover:text-purple-600"
				>
					<Link href={`/dashboard/inventory?page=1&category=${category._id}`}>
						Ver inventario
						<ExternalLink className="w-4 h-4 ml-2" />
					</Link>
				</Button>
			</Card.Footer>
		</Card.Root>
	);
}

function CategorySkeleton() {
	return (
		<Card.Root className="transition-all duration-200 hover:shadow-sm">
			<Card.Header className="pb-4">
				<div className="flex items-center justify-between">
					<h3 className="text-lg font-medium">
						<Skeleton className="w-48 h-6" />
					</h3>
					<Button
						variant="ghost"
						size="sm"
						className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
					>
						<MoreHorizontal className="w-4 h-4" />
					</Button>
				</div>
			</Card.Header>
			<Card.Body className="py-0">
				<div className="flex items-center justify-between mb-6 mt-1">
					<div className="flex items-center text-sm text-gray-600">
						<Skeleton className="w-32 h-4" />
					</div>
					<Skeleton className="w-16 h-4" />
				</div>
			</Card.Body>
			<Card.Footer className="flex gap-2">
				<Button variant="outline" size="sm" disabled className="flex-1">
					<Edit3 className="w-4 h-4 mr-2" />
					Editor
				</Button>
				<Button
					disabled
					variant="ghost"
					size="sm"
					className="text-purple-500 hover:text-purple-600"
				>
					Ver inventario
					<ExternalLink className="w-4 h-4 ml-2" />
				</Button>
			</Card.Footer>
		</Card.Root>
	);
}
