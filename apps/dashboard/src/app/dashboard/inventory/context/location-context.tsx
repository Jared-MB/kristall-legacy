"use client";

import type {
	Location,
	LocationProduct,
} from "@kristall/core/modules/locations/interfaces";
import {
	type Dispatch,
	type SetStateAction,
	createContext,
	useContext,
	useState,
} from "react";

// #region LocationsContext

export const LocationsContext = createContext<Location[]>([]);

export const LocationsProvider = ({
	value,
	children,
}: {
	value: Location[];
	children: React.ReactNode;
}) => (
	<LocationsContext.Provider value={value}>
		{children}
	</LocationsContext.Provider>
);

export const useLocationsContext = () => useContext(LocationsContext);

// #region LocationsToAddContext

export type LocationToAdd = Pick<LocationProduct, "locationId" | "stock">;

type LocationToAddContextType = [
	LocationToAdd[] | LocationProduct[],
	Dispatch<SetStateAction<LocationToAdd[] | LocationProduct[]>>,
];

export const LocationsToAddContext = createContext<LocationToAddContextType>([
	[],
	() => {},
]);

export const LocationsToAddProvider = ({
	value,
	children,
}: {
	value?: LocationToAdd[] | LocationProduct[];
	children: React.ReactNode;
}) => {
	const state = useState<LocationToAdd[] | LocationProduct[]>(value ?? []);

	return (
		<LocationsToAddContext.Provider value={state}>
			{children}
		</LocationsToAddContext.Provider>
	);
};

export const useLocationsToAddContext = () => {
	const [locationsToAdd, setLocationsToAdd] = useContext(LocationsToAddContext);

	const editLocation = (stock: number, locationId: string) => {
		const mappedLocations = locationsToAdd.map((location) => {
			if (location.locationId === locationId) {
				return {
					...location,
					stock,
				};
			}
			return location;
		});

		setLocationsToAdd(mappedLocations);
	};

	const addLocation = (location: LocationProduct | LocationToAdd) => {
		setLocationsToAdd([...locationsToAdd, location]);
	};

	const removeLocation = (locationId: string) => {
		const newLocations = locationsToAdd.filter(
			(location) => location.locationId !== locationId,
		);
		setLocationsToAdd(newLocations);
	};

	const clearLocations = () => setLocationsToAdd([]);

	return {
		locationsToAdd,
		setLocationsToAdd,
		editLocation,
		addLocation,
		removeLocation,
		clearLocations,
	};
};

// #region LocationProvider

export const LocationContext = createContext<
	LocationProduct | LocationToAdd | null
>(null);

interface LocationProviderProps {
	value: LocationProduct | LocationToAdd;
	children: React.ReactNode;
}

export const LocationProvider = ({
	children,
	value,
}: LocationProviderProps) => {
	return (
		<LocationContext.Provider value={value}>
			{children}
		</LocationContext.Provider>
	);
};

export const useLocationContext = () => useContext(LocationContext);
