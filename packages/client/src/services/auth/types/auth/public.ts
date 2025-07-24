import type { FormResponse } from "@kristall/shared/types/forms/form-response";
import type { InputField } from "@kristall/shared/types/forms/input-fields";

export interface Authorized {
	access_token: string;
}

export interface LoginFields {
	username: InputField;
	password: InputField;
}

export type LoginResponse = FormResponse<LoginFields>;
