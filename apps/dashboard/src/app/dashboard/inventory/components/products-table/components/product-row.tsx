import NoImage from "@/components/svg/no-image";
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/core/utils";
import type { Product } from "@/types/product";
import { sumArray } from "@/utils/array/removeArrayFromArray";
import { MoreVertical } from "lucide-react";
import ProductMenu from "./product-menu";

export default function ProductRow({ product }: { product: Product }) {
	return (
		<TableRow className={cn(product.stock === 0 && "opacity-60")}>
			<TableCell className="hidden md:block">
				<div className="grid place-content-center">
					{product.image?.url ? (
						<img
							loading="lazy"
							src={product.image?.url}
							alt={`Imagen del producto ${product.name}`}
							className="w-10 h-10 rounded object-cover aspect-square object-center"
						/>
					) : (
						<div className="w-10 h-10 flex items-center justify-center overflow-hidden rounded">
							<NoImage className="w-full h-full object-contain" />
						</div>
					)}
				</div>
			</TableCell>
			<TableCell>{product.name}</TableCell>
			<TableCell>${product.price}</TableCell>
			<TableCell>{sumArray(product.locations, "stock")}</TableCell>
			<TableCell>
				<ProductMenu productId={product._id} />
			</TableCell>
		</TableRow>
	);
}

export function ProductRowSkeleton() {
	return (
		<TableRow>
			<TableCell>
				<div className="grid place-content-center">
					<Skeleton className="rounded w-10 h-10" />
				</div>
			</TableCell>
			<TableCell>
				<Skeleton className="h-4" />
			</TableCell>
			<TableCell>
				<Skeleton className="h-4 w-10" />
			</TableCell>
			<TableCell>
				<Skeleton className="h-4 w-10" />
			</TableCell>
			<TableCell>
				<MoreVertical />
			</TableCell>
		</TableRow>
	);
}

// ? THIS ONE IS ANOTHER EXAMPLE OF A SKELETON COMPONENT BUT DOESN'T HAVE A USAGE IN THE CODE
// export function ProductRowSkeleton() {
// 	return <TableRow className="skeleton h-[72px]" />;
// }
