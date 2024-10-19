"use server";

import type { Expense } from "@/types/expense";
import { ExpensesConnection } from "@/utils/connections";
import { AddExpenseSchema } from "@/validator/expense.validator";
import { revalidatePath } from "next/cache";

/**
 * @deprecated
 */
export const getExpenses = async () =>
	await ExpensesConnection.get<Expense[]>();

/**
 * @deprecated
 */
export const addExpense = async (_prevState: unknown, payload: FormData) => {
	const data = Object.fromEntries(payload.entries());
	const parsedData = AddExpenseSchema.safeParse({
		...data,
		date: new Date(),
	});
	if (!parsedData.success) {
		return {
			errors: parsedData.error.flatten().fieldErrors,
		};
	}

	try {
		await ExpensesConnection.post(parsedData.data);
	} catch (error) {
		return {
			errors: {
				general: ["Error al agregar el gasto. Intente de nuevo."],
			},
		};
	}

	revalidatePath("/dashboard/expenses");
	return {
		success: true,
	};
};
