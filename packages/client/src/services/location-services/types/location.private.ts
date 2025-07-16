import type { FormResponse, InputField } from "@kristall/shared/types/forms";

export interface UploadLocationFields {
	name: InputField;
	address: InputField;
	phone: InputField;
}

export type UploadLocationResponse = FormResponse<UploadLocationFields>;

export interface UpdateLocationFields extends UploadLocationFields {
	_id: InputField;
}

export type UpdateLocationResponse = FormResponse<UpdateLocationFields>;
