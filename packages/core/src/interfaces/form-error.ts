export enum FORM_MESSAGE_TYPES {
	SUCCESS = "SUCCESS",
	INTERNAL_ERROR = "INTERNAL_ERROR",
	PAYMENT_REQUIRED = "PAYMENT_REQUIRED",
	IMAGE_SIZE_ERROR = "IMAGE_SIZE_ERROR",
	IMAGE_ERROR = "IMAGE_ERROR",
}

export interface FormErrorResponse<T> {
	message?: { type: FORM_MESSAGE_TYPES; value: string };
	fields: T;
}

export interface InputField {
	value: any;
	message: string;
}
