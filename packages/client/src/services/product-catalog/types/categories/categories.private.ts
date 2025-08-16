import type { FormResponse } from "@kristall/shared/types/forms/form-response";
import type { InputField } from "@kristall/shared/types/forms/input-fields";

export interface UploadCategoryFields {
	name: InputField;
}

export type UploadCategoryResponse = FormResponse<UploadCategoryFields>;

export interface UpdateCategoryFields extends UploadCategoryFields {
	_id: InputField;
	isActive: InputField;
}

export type UpdateCategoryResponse = FormResponse<UpdateCategoryFields>;

export interface DeleteCategoryFields {
	_id: InputField;
}

export type DeleteCategoryResponse = FormResponse<DeleteCategoryFields>;
