import type { FormResponse } from "@kristall/shared/types/forms/form-response";
import type { InputField } from "@kristall/shared/types/forms/input-fields";

export interface UploadClientFields {
	name: InputField;
}

export type UploadClientResponse = FormResponse<UploadClientFields>;

export interface UpdateClientFields {
	name: InputField;
}

export type UpdateClientResponse = FormResponse<UpdateClientFields>;

export type DeleteClientResponse = FormResponse<null>;
