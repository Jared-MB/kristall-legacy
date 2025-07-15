export enum FORM_MESSAGE_TYPES {
	SUCCESS = "SUCCESS",
	INTERNAL_ERROR = "INTERNAL_ERROR",
	PAYMENT_REQUIRED = "PAYMENT_REQUIRED",
	IMAGE_SIZE_ERROR = "IMAGE_SIZE_ERROR",
	IMAGE_ERROR = "IMAGE_ERROR",
	/**
	 * When a form is submitted with missing internal fields like `_id`
	 *
	 * @example
	 * ```tsx
	 * // This is an internal field
	 * <input
	 * 	name="_id"
	 * 	defaultValue={client._id}
	 * 	hidden
	 * 	aria-hidden
	 * 	readOnly
	 * />
	 * ```
	 */
	MISSING_INTERNAL_FIELDS = "MISSING_INTERNAL_FIELDS",
	INVALID_FIELDS = "INVALID_FIELDS",
	SUBSCRIPTION_FEATURE_LIMIT_REACHED = "SUBSCRIPTION_FEATURE_LIMIT_REACHED",
}
