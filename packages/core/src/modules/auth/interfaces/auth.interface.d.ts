import type zod from "zod";
import type { LoginSchema, RegisterSchema } from "../validators/auth.validator";

export type RegisterUser = zod.infer<typeof RegisterSchema>;

export type LoginUser = zod.infer<typeof LoginSchema>;

export interface Authorized {
	access_token: string;
}

export interface InputField {
	value: string;
	message: string;
}

export interface LoginFields {
	username: InputField;
	password: InputField;
}

export interface LoginResponse {
	message?: string;
	fields: LoginFields;
}

export interface RegisterFields extends LoginFields {
	shopName: InputField;
	email: InputField;
	confirmPassword: InputField;
}

export interface RegisterResponse {
	message?: string;
	fields: RegisterFields;
}
