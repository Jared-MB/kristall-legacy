"use server";

import type { Location } from "@/types/location";
import { LocationConnection, LocationsConnection } from "@/utils/connections";
import { AddLocationSchema } from "@/validator/location.validator";
import { revalidatePath } from "next/cache";

/**
 * @deprecated
 */
export const getLocations = async () =>
	await LocationsConnection.get<Location[]>();

/**
 * @deprecated
 */
export const addLocation = async (_prev: unknown, data: FormData) => {
	const rawData = Object.fromEntries(data.entries());

	const validatedFields = AddLocationSchema.safeParse(rawData);

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	try {
		const location = await LocationsConnection.post<Location>(
			validatedFields.data,
		);
		revalidatePath("/dashboard/locations");
		return { location };
	} catch (error) {
		return {
			errors: {
				message: "Error al agregar la ubicación",
			},
		};
	}
};

/**
 * @deprecated
 */
export const editLocation = async (_prev: unknown, data: FormData) => {
	const rawData = Object.fromEntries(data.entries());

	const _id = rawData._id;

	if (!_id) return { errors: { message: "Error al editar la ubicación" } };

	const validatedFields = AddLocationSchema.safeParse(rawData);

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	try {
		const location = await LocationConnection(_id.toString()).put<Location>(
			validatedFields.data,
		);
		revalidatePath("/dashboard/locations");
		return { location };
	} catch (error) {
		return {
			errors: {
				message: "Error al agregar la ubicación",
			},
		};
	}
};
