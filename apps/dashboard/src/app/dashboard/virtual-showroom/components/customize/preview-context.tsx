"use client";

import { createContext, use, useState } from "react";

interface PreviewContextValue {
	hasStateChanged: boolean;
	setHasStateChanged: (value: boolean) => void;
}

export const PreviewContext = createContext<PreviewContextValue>({
	hasStateChanged: false,
} as PreviewContextValue);

export function PreviewProvider({ children }: { children: React.ReactNode }) {
	const [hasStateChanged, setHasStateChanged] = useState(false);

	return (
		<PreviewContext
			value={{
				hasStateChanged,
				setHasStateChanged,
			}}
		>
			{children}
		</PreviewContext>
	);
}

export function usePreview() {
	return use(PreviewContext);
}
