"use client";

import type { ProductBatch } from "@kristall/core/modules/locations/interfaces";
import {
	type Dispatch,
	type SetStateAction,
	createContext,
	useContext,
	useState,
} from "react";

export type BatchToAdd = Omit<ProductBatch, "_id">;

type BatchesContextType = {
	batches: ProductBatch[] | BatchToAdd[];
	setBatches: Dispatch<SetStateAction<ProductBatch[] | BatchToAdd[]>>;
	isEnabled: boolean;
	setEnabled: Dispatch<SetStateAction<boolean>>;
};

export const BatchesContext = createContext<BatchesContextType>({
	batches: [],
	isEnabled: false,
	setBatches: () => {},
	setEnabled: () => {},
});

interface BatchesProviderProps {
	value?: {
		batches?: ProductBatch[];
		isEnabled?: boolean;
		defaultBatchEnabled: boolean;
	};
	children: React.ReactNode;
}

export const BatchesProvider = ({ value, children }: BatchesProviderProps) => {
	const [batches, setBatches] = useState<ProductBatch[] | BatchToAdd[]>(
		value?.batches ?? [],
	);
	const [isEnabled, setEnabled] = useState<boolean>(
		value?.defaultBatchEnabled || value?.isEnabled || false,
	);

	return (
		<BatchesContext.Provider
			value={{
				batches,
				setBatches,
				isEnabled,
				setEnabled,
			}}
		>
			{children}
		</BatchesContext.Provider>
	);
};

export const useBatchesContext = () => {
	const { batches, setBatches, isEnabled, setEnabled } =
		useContext(BatchesContext);

	const editBatch = (batch: BatchToAdd) => {
		const batchesMapped = batches.map((btc) => {
			if (btc.batchNumber === batch.batchNumber) {
				return {
					...btc,
					...batch,
				};
			}
			return btc;
		});
		setBatches(batchesMapped);
	};

	const addBatch = (batch: ProductBatch | BatchToAdd) => {
		setBatches([...batches, batch]);
	};

	const removeBatchByLocationId = (locationId: string) => {
		const newBatches = batches.filter(
			(batch) => batch.locationProduct.locationId !== locationId,
		);
		setBatches(newBatches);
	};

	const clearBatches = () => setBatches([]);

	return {
		batches,
		setBatches,
		editBatch,
		addBatch,
		isEnabled,
		setEnabled,
		removeBatchByLocationId,
		clearBatches,
	};
};

// #region BatchContext

export const BatchContext = createContext<ProductBatch | BatchToAdd | null>(
	null,
);

interface BatchProviderProps {
	value: ProductBatch | BatchToAdd | null;
	children: React.ReactNode;
}

export const BatchProvider = ({ value, children }: BatchProviderProps) => {
	return (
		<BatchContext.Provider value={value}>{children}</BatchContext.Provider>
	);
};

export const useBatchContext = () => useContext(BatchContext);
