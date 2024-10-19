"use client";

import { createContext, useContext } from "react";

export interface Error {
	field: string;
	message: string;
}

export const ErrorsContext = createContext<Error[]>([]);

export const ErrorsProvider = ({
	children,
	value,
}: { children: React.ReactNode; value: Error[] | string }) => {
	return (
		<ErrorsContext.Provider value={typeof value === "string" ? [] : value}>
			{children}
		</ErrorsContext.Provider>
	);
};

export const useErrorsContext = () => useContext(ErrorsContext);
