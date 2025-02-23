export interface FormErrorResponse<T> {
	message?;
	fields: T;
}

export interface InputField {
	value: string;
	message: string;
}
