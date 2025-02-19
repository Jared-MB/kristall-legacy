import type { ZodError, typeToFlattenedError } from "zod";

export class ZodErrorExtractor<T> {
	constructor(
		private readonly values: { [x: string]: FormDataEntryValue },
		private readonly error?: ZodError<T>,
	) {}

	/**
	 * Extracts the error message for a given form input based on zod validation results.
	 * @param input - The key of the form input.
	 * @returns An object containing the value and error message.
	 */
	public extractError(input: keyof typeToFlattenedError<T>["fieldErrors"]) {
		return {
			value: this.values[input]?.toString(),
			message: this.error
				? this.error.flatten().fieldErrors[input]?.[0] ?? ""
				: "",
		};
	}

	/**
	 * Extracts errors for all specified fields.
	 * @param fields - An array of field names to extract errors for.
	 * @returns An object mapping field names to their error details.
	 */
	public extractErrorsForFields(
		fields: (keyof typeToFlattenedError<T>["fieldErrors"])[],
	): Record<
		keyof typeToFlattenedError<T>["fieldErrors"],
		{
			value: string;
			message: string;
		}
	> {
		return fields.reduce(
			(acc, field) => {
				acc[field] = this.extractError(field);
				return acc;
			},
			{} as Record<
				keyof typeToFlattenedError<T>["fieldErrors"],
				{ value: string; message: string }
			>,
		);
	}
}
