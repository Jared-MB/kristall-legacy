export interface FormErrorResponse<T> {
	message?: { type: any; value: string };
	fields: T;
}

export interface InputField {
	value: any;
	message: string;
}
