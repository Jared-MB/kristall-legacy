"use server";

import type { Customer } from "@/types/customer";
import { ServerConnection } from "@/utils/ServerConnection";
import { CustomerConnection, CustomersConnection } from "@/utils/connections";
import { AddCustomerSchema } from "@/validator/customer.validator";
import { revalidatePath } from "next/cache";

/**
 * @deprecated
 */
export const getCustomers = async () =>
	await CustomersConnection.get<Customer[]>();

/**
 * @deprecated
 */
export const getCustomersByName = async (searchParams: URLSearchParams) => {
	searchParams.set("take", "7");
	searchParams.set("skip", "0");

	console.log(searchParams.toString());

	const connection = new ServerConnection(
		`/clients?${searchParams.toString()}`,
	);

	return await connection.get<Customer[]>();
};

/**
 * @deprecated
 */
export const addCustomer = async (_prev: unknown, data: FormData) => {
	const rawData = Object.fromEntries(data.entries());

	const validatedFields = AddCustomerSchema.safeParse(rawData);

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	try {
		await CustomersConnection.post<Customer>(validatedFields.data);
		revalidatePath("/dashboard/customers");
		return {
			message: "Cliente agregado correctamente",
		};
	} catch (error) {
		return {
			errors: {
				message: "Error al agregar el cliente",
			},
		};
	}
};

/**
 * @deprecated
 */
export const editCustomer = async (_prev: unknown, data: FormData) => {
	const rawData = Object.fromEntries(data.entries());

	const _id = rawData._id;

	if (!_id) return { errors: { message: "Error al editar el cliente" } };

	const validatedFields = AddCustomerSchema.safeParse(rawData);

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	try {
		await CustomerConnection(_id.toString()).put<Customer>(
			validatedFields.data,
		);
		revalidatePath("/dashboard/customers");
		return {
			message: "Cliente editado correctamente",
		};
	} catch (error) {
		return {
			errors: {
				message: "Error al editar el cliente",
			},
		};
	}
};

/**
 * @deprecated
 */
export const removeCustomer = async (_prev: unknown, data: FormData) => {
	const rawData = Object.fromEntries(data.entries());

	const _id = rawData._id;

	if (!_id) return { errors: { message: "Error al eliminar el cliente" } };

	try {
		await CustomerConnection(_id.toString()).delete<Customer>();
		revalidatePath("/dashboard/customers");
		return {
			message: "Cliente eliminado correctamente",
		};
	} catch (error) {
		return {
			errors: {
				message: "Error al eliminar el cliente",
			},
		};
	}
};
