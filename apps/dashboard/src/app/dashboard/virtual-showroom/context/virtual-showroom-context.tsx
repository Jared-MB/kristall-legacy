"use client";

import type { VirtualShowroom } from "@kristall/core/interfaces/virtual-showroom";
import { createContext } from "react";

export const VirtualShowroomContext = createContext<VirtualShowroom>({
	_id: "",
	isPublic: false,
	url: "",
	title: "",
});

interface VirtualShowroomProviderProps {
	children: React.ReactNode;
	virtualShowroom: VirtualShowroom;
}
export const VirtualShowroomProvider = ({
	children,
	virtualShowroom,
}: VirtualShowroomProviderProps) => {
	return (
		<VirtualShowroomContext value={virtualShowroom}>
			{children}
		</VirtualShowroomContext>
	);
};
