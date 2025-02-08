"use client";

import { getPaginatedProducts } from "@kristall/core/products/get";
import { createContext, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface SearchProduct {
	label: string;
	value: string;
}

interface SearchProductContextType {
	setSearchParams: (value: string) => void;
	products: SearchProduct[];
}

export const SearchProductContext = createContext<SearchProductContextType>(
	{} as SearchProductContextType,
);

export const SearchProductContextProvider = ({
	children,
}: { children: React.ReactNode }) => {
	const [searchParams, setSearchParams] = useState<URLSearchParams>(
		new URLSearchParams(),
	);
	const [fetchedProducts, setProducts] = useState<SearchProduct[]>([]);

	const fetchProducts = async (searchParams: URLSearchParams) =>
		getPaginatedProducts(searchParams);

	const debounce = (value: string) => {
		const newSearchParams = new URLSearchParams(searchParams);
		if (!value) {
			newSearchParams.delete("name");
		} else {
			newSearchParams.set("name", value);
		}
		setSearchParams(newSearchParams);
	};

	const changeSearchParams = useDebouncedCallback(debounce, 500);

	useEffect(() => {
		fetchProducts(searchParams).then((allProducts) => {
			const mappedProducts = allProducts.entities.map((product) => ({
				label: product.name,
				value: `${product.name.toLowerCase()}/${product._id}`,
			}));
			setProducts(mappedProducts);
		});
	}, [searchParams]);

	return (
		<SearchProductContext
			value={{ products: fetchedProducts, setSearchParams: changeSearchParams }}
		>
			{children}
		</SearchProductContext>
	);
};
