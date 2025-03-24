/**
 * @deprecated Use the constants exported instead
 */
export const environment = {
	SERVER_API: process.env.SERVER_API,
};

export const {
	SERVER_API = "http://localhost:3000",
	R2_BUCKET_NAME = "",
	R2_BUCKET_PREFIX = "",
	R2_ACCOUNT_ID = "",
	R2_ACCESS_KEY_ID = "",
	R2_SECRET_ACCESS_KEY = "",
} = process.env;
