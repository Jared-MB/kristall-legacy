"use client";

import { uploadVirtualShowroomConfig } from "@kristall/core/virtual-showroom/config/upload";
import { createContext, use, useActionState, useRef, useState } from "react";

interface PreviewContextValue {
	hasStateChanged: boolean;
	setHasStateChanged: (value: boolean) => void;
	shopName: string;
	setPreviewColor: (value: string) => void;
	previewColor: string;
	formRef: React.RefObject<HTMLFormElement | null>;
	setHasColorChanged: (value: boolean) => void;
	hasColorChanged: boolean;
}

export const PreviewContext = createContext<PreviewContextValue | null>(null);

export function PreviewProvider({
	children,
	shopName,
	customColor,
}: {
	children: React.ReactNode;
	shopName: string;
	customColor?: string;
}) {
	const [hasStateChanged, setHasStateChanged] = useState(false);
	const [previewColor, setPreviewColor] = useState(customColor ?? "#A855F7");
	const [hasColorChanged, setHasColorChanged] = useState(false);

	const formRef = useRef<HTMLFormElement>(null);

	const [_, dispatch] = useActionState(uploadVirtualShowroomConfig, undefined);

	return (
		<PreviewContext
			value={{
				hasStateChanged,
				setHasStateChanged,
				shopName,
				setHasColorChanged,
				hasColorChanged,
				setPreviewColor,
				previewColor,
				formRef,
			}}
		>
			<form ref={formRef} action={dispatch}>
				{children}
			</form>
		</PreviewContext>
	);
}

export function usePreview() {
	const context = use(PreviewContext);

	if (!context) {
		throw new Error("PreviewContext not found");
	}

	return context;
}
