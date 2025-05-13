import type { ZodError, typeToFlattenedError } from "zod";

type FormDataValue =
	| FormDataEntryValue
	| Date
	| string
	| number
	| File
	| boolean;

interface Values {
	[x: string]: FormDataValue | Values | Values[];
}

export class ZodErrorExtractor<T> {
	constructor(
		private readonly values: Values,
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
	 * Extracts the value for a given form input based on zod validation results.
	 * @param input - The key of the form input.
	 * @returns An object containing the value and empty error message.
	 */
	public extractValue(input: keyof typeToFlattenedError<T>["fieldErrors"]) {
		return {
			value: this.values[input]?.toString(),
			message: "",
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

	/**
	 * Values for all specified fields.
	 * @param fields - An array of field names to extract.
	 * @returns An object mapping field names to their value and empty message.
	 */
	public extractValuesForFields(
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
				acc[field] = this.extractValue(field);
				return acc;
			},
			{} as Record<
				keyof typeToFlattenedError<T>["fieldErrors"],
				{
					value: string;
					message: string;
				}
			>,
		);
	}

	public extractEmptyValuesForFields(
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
				acc[field] = {
					value: "",
					message: "",
				};
				return acc;
			},
			{} as Record<
				keyof typeToFlattenedError<T>["fieldErrors"],
				{
					value: string;
					message: string;
				}
			>,
		);
	}
}
