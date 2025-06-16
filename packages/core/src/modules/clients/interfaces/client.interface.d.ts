import type {
	FormErrorResponse,
	InputField,
} from "../../../interfaces/form-error";

export interface Client {
	_id: string;
	name: string;
	purchases: number;
}

export interface UploadClientFields {
	_id: InputField;
	name: InputField;
}

export type UploadClientResponse = FormErrorResponse<UploadClientFields>;
