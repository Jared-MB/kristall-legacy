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
