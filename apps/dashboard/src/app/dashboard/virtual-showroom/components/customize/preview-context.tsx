"use client";

import type { MotionValue } from "motion/react";
import { createContext, use, useState } from "react";

interface PreviewContextValue {
	hasStateChanged: boolean;
	setHasStateChanged: (value: boolean) => void;
	scrollYProgress: MotionValue<number>;
	shopName: string;
}

export const PreviewContext = createContext<PreviewContextValue>({
	hasStateChanged: false,
} as PreviewContextValue);

export function PreviewProvider({
	children,
	shopName,
	scrollYProgress,
}: {
	children: React.ReactNode;
	scrollYProgress: MotionValue<number>;
	shopName: string;
}) {
	const [hasStateChanged, setHasStateChanged] = useState(false);

	return (
		<PreviewContext
			value={{
				hasStateChanged,
				setHasStateChanged,
				scrollYProgress,
				shopName,
			}}
		>
			{children}
		</PreviewContext>
	);
}

export function usePreview() {
	return use(PreviewContext);
}
