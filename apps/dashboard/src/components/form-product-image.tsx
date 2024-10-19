"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { type UseImageOptions, useImage } from "@/core/hooks";
import { cn } from "@/core/utils";
import { useRef } from "react";

export default function ProductImage({
	url,
	fallback,
	classNames,
	id,
	options,
}: {
	url?: string;
	fallback: React.ReactNode;
	classNames?: {
		container?: string;
		image?: string;
		fallback?: string;
	};
	id?: string;
} & { options?: UseImageOptions }) {
	const { previewImage, handleImageUpload, hasChanged, file } = useImage(
		url,
		options,
	);

	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const openFileInput = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	return (
		<>
			<Avatar
				className={cn(
					"w-36 h-36 md:w-28 md:h-28 cursor-pointer ",
					classNames?.container,
				)}
				title="Click para cambiar la imagen"
				onClick={openFileInput}
			>
				<AvatarImage
					src={previewImage ?? url}
					className={cn(classNames?.image)}
				/>
				<AvatarFallback className={cn("text-4xl", classNames?.fallback)}>
					{fallback}
				</AvatarFallback>
			</Avatar>
			<input className="hidden" hidden name="image_id" value={id} readOnly />
			<input className="hidden" hidden name="image_url" readOnly value={url} />
			<input
				type="file"
				accept="image/*"
				className="hidden"
				name="image"
				ref={fileInputRef}
				onChange={handleImageUpload}
			/>
			<input
				name="has_image_changed"
				hidden
				aria-hidden
				readOnly
				value={hasChanged}
			/>
		</>
	);
}
