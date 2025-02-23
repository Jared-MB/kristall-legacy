import type {
	FormErrorResponse,
	InputField,
} from "../../../interfaces/form-error";

interface CancelSubscriptionFields {
	email: InputField;
	password: InputField;
	confirm: InputField;
}

export type CancelSubscriptionError =
	FormErrorResponse<CancelSubscriptionFields>;
