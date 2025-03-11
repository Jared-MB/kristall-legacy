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
} = process.env;
