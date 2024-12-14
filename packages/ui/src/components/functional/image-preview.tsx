"use client";

import { useRef } from "react";

import { useImage } from "@kristall/core/image/hooks/use-image";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
	url?: string;
	fallback: React.ReactNode;
	id?: string;
}

export function ImagePreview({ url, fallback, id }: Props) {
	const { previewImage, setImage, hasImageChanged } = useImage(url);

	const fileInputRef = useRef<HTMLInputElement>(null);

	const openFileInput = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	return (
		<>
			<Avatar
				className="w-36 h-36 md:w-28 md:h-28 cursor-pointer"
				title="Click para cambiar la imagen"
				onClick={openFileInput}
			>
				<AvatarImage
					className="object-cover object-center"
					src={previewImage ?? url}
				/>
				<AvatarFallback>{fallback}</AvatarFallback>
			</Avatar>
			<input className="hidden" hidden name="image_id" value={id} readOnly />
			<input className="hidden" hidden name="image_url" readOnly value={url} />
			<input
				type="file"
				accept="image/*"
				className="hidden"
				name="image"
				ref={fileInputRef}
				onChange={setImage}
			/>
			<input
				name="has_image_changed"
				hidden
				aria-hidden
				readOnly
				value={hasImageChanged}
			/>
		</>
	);
}
