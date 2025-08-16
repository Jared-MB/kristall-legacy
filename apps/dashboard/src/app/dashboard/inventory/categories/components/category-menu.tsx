import type { PrivateCategory } from "@kristall/shared/domains/product-catalog/types/category.private";

import { MoreVertical } from "lucide-react";

import { Button } from "@kristall/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@kristall/ui/dropdown-menu";

import { DeleteCategory } from "./delete-category";

export function CategoryMenu({ category }: { category: PrivateCategory }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size="icon" variant="outline" className="size-8">
					<MoreVertical className="size-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Opciones</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<DeleteCategory category={category} />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
