/**
 * @description Take the "page" query parameter from the URL and return the skip and take query parameters.
 */
export const paginateURL = (
	searchParams: Readonly<URLSearchParams>,
): string => {
	const query = new URLSearchParams(searchParams);
	const page = Number(query.get("page") || "1");
	const skip = (page - 1) * 7;

	query.delete("page");

	query.set("skip", skip.toString());
	query.set("take", "7");
	return query.toString();
};
