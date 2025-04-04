"use client";

import type { VirtualShowroomConfig } from "@kristall/core/interfaces/virtual-showroom";

import { createContext, use } from "react";

export const ConfigContext = createContext<VirtualShowroomConfig | null>(null);

interface ConfigProviderProps {
	children: React.ReactNode;
	config: VirtualShowroomConfig | null;
}

export function ConfigProvider({ children, config }: ConfigProviderProps) {
	return <ConfigContext value={config}>{children}</ConfigContext>;
}

export const useConfig = () => {
	return use(ConfigContext);
};
