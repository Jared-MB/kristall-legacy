"use client";

import { useLikesStore } from "@/store/likes";
import type { PublicProduct } from "@kristall/core/interfaces/products";
import { Button } from "@kristall/ui/button";
import { cn } from "@kristall/ui/utils/cn";
import { Heart, ShoppingCart } from "lucide-react";

export function ProductActions({
	isAvailable,
	_id,
}: Pick<PublicProduct, "isAvailable" | "_id">) {
	const { likes, addLike, removeLike } = useLikesStore();

	const isLiked = likes.includes(_id);

	const handleClick = () => {
		if (isLiked) {
			removeLike(_id);
		} else {
			addLike(_id);
		}
	};

	return (
		<div className="space-y-4">
			<div className="flex gap-3">
				<Button
					size="lg"
					className="flex-1 text-white bg-[var(--vs-custom-500)] hover:bg-[var(--vs-custom-400)]"
					disabled={!isAvailable}
				>
					<ShoppingCart className="h-5 w-5 mr-2" />
					{isAvailable ? "Add to Cart" : "Out of Stock"}
				</Button>
				<Button
					size="lg"
					variant="outline"
					onClick={handleClick}
					className="hover:text-rose-600 group"
				>
					<Heart
						className={cn(
							"h-5 w-5 transition-all duration-300 group-active:scale-90 group-hover:scale-110",
							{
								"text-rose-600 fill-rose-600": isLiked,
							},
						)}
					/>
				</Button>
			</div>
			{isAvailable && (
				<Button variant="outline" size="lg" className="w-full">
					Buy Now
				</Button>
			)}
		</div>
	);
}

export function ProductActionsSkeleton() {
	return (
		<div className="space-y-4">
			<div className="flex gap-3">
				<Button
					size="lg"
					className="flex-1 text-white bg-[var(--vs-custom-500)] hover:bg-[var(--vs-custom-400)]"
					disabled
				>
					<ShoppingCart className="h-5 w-5 mr-2" />
					Add to Cart
				</Button>
				<Button
					size="lg"
					variant="outline"
					disabled
					className="hover:text-rose-600 group"
				>
					<Heart className="h-5 w-5 transition-all duration-300 group-active:scale-90 group-hover:scale-110" />
				</Button>
			</div>
			<Button variant="outline" size="lg" className="w-full" disabled>
				Buy Now
			</Button>
		</div>
	);
}
