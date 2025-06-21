"use client";

import { create } from "zustand";

import { ScrollArea } from "@kristall/ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "@kristall/ui/toggle-group";
import { cn } from "@kristall/ui/utils/cn";
import { Grid, List } from "lucide-react";

type View = "grid" | "list";

interface ViewStore {
	view: View;
	setView: (view: View) => void;
}

export const useViewStore = create<ViewStore>()((set) => ({
	view: "grid",
	setView: (view: View) => set({ view }),
}));

export function ProductsView({ children }: { children: React.ReactNode }) {
	const view = useViewStore((state) => state.view);

	return (
		<ScrollArea className="p-6">
			<div
				className={cn(
					"grid gap-5 max-h-[80dvh]",
					view === "grid"
						? "grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 "
						: "grid-cols-1",
				)}
			>
				{children}
			</div>
		</ScrollArea>
	);
}

export function ProductsViewSwitch() {
	const { setView, view } = useViewStore();

	return (
		<ToggleGroup
			type="single"
			value={view}
			onValueChange={(e) => setView((e as View) || "grid")}
		>
			<ToggleGroupItem value="grid" aria-label="Grid view">
				<Grid />
			</ToggleGroupItem>
			<ToggleGroupItem value="list" aria-label="List view">
				<List />
			</ToggleGroupItem>
		</ToggleGroup>
	);
}
