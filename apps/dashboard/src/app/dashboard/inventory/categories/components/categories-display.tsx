"use client";

import { Grid, List } from "lucide-react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { ToggleGroup, ToggleGroupItem } from "@kristall/ui/toggle-group";
import { cn } from "@kristall/ui/utils/cn";

type CategoriesDisplayMode = "list" | "grid";

interface CategoriesDisplayContextType {
	displayMode: CategoriesDisplayMode;
	setDisplayMode: (mode: CategoriesDisplayMode) => void;
}

export const useCategoriesDisplay = create<CategoriesDisplayContextType>()(
	persist(
		(set) => ({
			displayMode: "grid",
			setDisplayMode: (mode: CategoriesDisplayMode) => {
				set({ displayMode: mode });
			},
		}),
		{
			name: "kristall:categories:display:mode",
		},
	),
);

export function CategoriesDisplay({ children }: { children: React.ReactNode }) {
	const displayMode = useCategoriesDisplay((state) => state.displayMode);

	return (
		<section
			className={cn(
				"relative grid",
				displayMode === "grid" && "grid-cols-3 gap-4",
				displayMode === "list" && "grid-cols-1 gap-2",
			)}
		>
			{children}
		</section>
	);
}

export function ChangeCategoriesDisplayMode() {
	const { setDisplayMode, displayMode } = useCategoriesDisplay();

	return (
		<ToggleGroup
			type="single"
			className="w-fit"
			value={displayMode}
			onValueChange={(e) =>
				setDisplayMode((e as CategoriesDisplayMode) ?? "grid")
			}
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
