"use client";

import { useImage } from "@kristall/core/image/hooks/use-image";
import { cn } from "@kristall/ui/utils/cn";
import { type MouseEvent, useEffect, useRef } from "react";
import { usePreview } from "./preview-context";

interface CardImageProps {
	children?: React.ReactNode;
	className?: string;
	name: string;
	url?: string;
}

export function CardImage({ children, className, name, url }: CardImageProps) {
	const { setImage, previewImage } = useImage(url);
	const { setHasStateChanged } = usePreview();

	const fileInputRef = useRef<HTMLInputElement>(null);

	const openFileInput = (e: MouseEvent<Element>) => {
		if ((e.target as HTMLElement).tagName === "TEXTAREA") {
			return;
		}
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	useEffect(() => {
		if (previewImage && !previewImage.includes("kristall.app")) {
			setHasStateChanged(true);
		}
	}, [previewImage]);

	return (
		<div
			className={cn("cursor-pointer", className)}
			style={{
				backgroundImage: `url(${previewImage})`,
			}}
			onClick={openFileInput}
		>
			{children}
			<input
				type="file"
				accept="image/*"
				className="hidden"
				name={name}
				ref={fileInputRef}
				onChange={setImage}
			/>
		</div>
	);
}
