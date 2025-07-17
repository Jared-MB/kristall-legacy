import type { FormResponse, InputField } from "@kristall/shared/types/forms";

export interface Authorized {
	access_token: string;
}

export interface LoginFields {
	username: InputField;
	password: InputField;
}

export type LoginResponse = FormResponse<LoginFields>;
