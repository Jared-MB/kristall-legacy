import { useEffect, useRef } from "react";
import { create } from "zustand";
import { combine } from "zustand/middleware";

export const useShortcutStore = create(
	combine(
		{
			isTyping: false,
		},
		(set) => ({
			setIsTyping: (isTyping: boolean) => set({ isTyping }),
		}),
	),
);

export const useShortcut = (
	keys: string[],
	callback: () => void,
	options: { ctrl?: boolean; alt?: boolean; shift?: boolean } = {},
) => {
	const { isTyping } = useShortcutStore();
	const callbackRef = useRef(callback);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			const ctrlMatch =
				options.ctrl === undefined || e.ctrlKey === options.ctrl;
			const altMatch = options.alt === undefined || e.altKey === options.alt;
			const shiftMatch =
				options.shift === undefined || e.shiftKey === options.shift;

			if (
				keys.includes(e.key?.toLowerCase()) &&
				ctrlMatch &&
				altMatch &&
				shiftMatch
			) {
				if (!isTyping) {
					e.preventDefault();
					callbackRef.current();
				}
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isTyping, keys, options]);
};
