import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LikesStore {
	likes: string[];
	addLike: (id: string) => void;
	removeLike: (id: string) => void;
}

export const useLikesStore = create<LikesStore>()(
	persist(
		(set) => ({
			likes: [],
			addLike: (id: string) =>
				set((state) => ({ likes: [...state.likes, id] })),
			removeLike: (id: string) =>
				set((state) => ({ likes: state.likes.filter((like) => like !== id) })),
		}),
		{
			name: "likes-storage",
		},
	),
);
