import type zod from "zod";
import type {
	FormErrorResponse,
	InputField,
} from "../../../interfaces/form-error";
import type { LoginSchema, RegisterSchema } from "../validators/auth.validator";

export type RegisterUser = zod.infer<typeof RegisterSchema>;

export type LoginUser = zod.infer<typeof LoginSchema>;

export interface Authorized {
	access_token: string;
}

export interface LoginFields {
	username: InputField;
	password: InputField;
}

export type LoginResponse = FormErrorResponse<LoginFields>;

export interface RegisterFields extends LoginFields {
	shopName: InputField;
	email: InputField;
	confirmPassword: InputField;
}

export type RegisterResponse = FormErrorResponse<RegisterFields>;
