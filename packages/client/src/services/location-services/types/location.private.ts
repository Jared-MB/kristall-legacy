import type { FormResponse } from "@kristall/shared/types/forms/form-response";
import type { InputField } from "@kristall/shared/types/forms/input-fields";

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
