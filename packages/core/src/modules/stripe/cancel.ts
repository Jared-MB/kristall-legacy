"use server";

import { revalidateTag } from "next/cache";

import type { InputField } from "@kristall/core/interfaces/form-error";
import { ZodErrorExtractor } from "@kristall/core/utils/zod-error-extractor";
import type { CancelSubscriptionError } from "./interfaces";

import { PUT } from "@kristall/http";

import { CANCEL_SUBSCRIPTION_CONFIRM } from "./constants/confirm-value";
import { STRIPE_TAGS } from "./constants/tags";
import { CancelSubscriptionSchema } from "./validators/cancel.validator";

export const cancelSubscription = async (
	_prevState: unknown,
	payload: FormData,
): Promise<CancelSubscriptionError | undefined> => {
	const rawData = Object.fromEntries(payload.entries());

	const parsedData = CancelSubscriptionSchema.safeParse(rawData);

	const fields = new ZodErrorExtractor(rawData, parsedData.error);

	const inputErrorValues = fields.extractErrorsForFields([
		"email",
		"password",
		"confirm",
	]);

	if (!parsedData.success) {
		return {
			fields: { ...inputErrorValues },
		};
	}

	const { data } = parsedData;

	if (data.confirm !== CANCEL_SUBSCRIPTION_CONFIRM) {
		const confirmError: InputField = {
			value: data.confirm,
			message: "El texto ingresado no coincide con el texto de confirmación",
		};

		return {
			fields: {
				...inputErrorValues,
				confirm: confirmError,
			},
		};
	}

	const response = await PUT<unknown>(
		"/stripe/cancel-subscription",
		parsedData.data,
	);

	if (response.status === 401) {
		return {
			fields: {
				...inputErrorValues,
				email: {
					value: data.email,
					message: "Email o contraseña incorrectos",
				},
				password: {
					value: data.password,
					message: "Email o contraseña incorrectos",
				},
			},
		};
	}

	if (response.status !== 200) {
		return {
			message: response.message ?? "Error al cancelar la suscripción",
			fields: {
				...fields.extractValuesForFields(["email", "password", "confirm"]),
			},
		};
	}

	revalidateTag(STRIPE_TAGS.ACCOUNT);

	/**
	 * EVERYTHING WORKS CORRECTLY, BUT FOR SOME REASON,
	 * REVALIDATE CUTS THE WORKFLOW AND STOP THE ACTION AT THIS POINT
	 * AND DOESN'T RETURN THE SUCCESS RESPONSE,
	 */
	return {
		message: "Se canceló correctamente la suscripción",
		fields: {
			...fields.extractEmptyValuesForFields(["email", "password", "confirm"]),
		},
	};
};
