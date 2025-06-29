import type { FORM_MESSAGE_TYPES } from "./messages";

export interface FormResponse<T> {
	message?: { type: FORM_MESSAGE_TYPES; value: string };
	fields: T;
}
