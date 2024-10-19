export const getHeaders = (token: string) => {
	if (!token) {
		return null;
	}

	return {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
		Cookie: `session=${token}`,
	};
};
