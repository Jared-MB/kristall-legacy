/**
 * @description Take the "page" query parameter from the URL and return the skip and take query parameters.
 *
 * @param take The number of items to take per page.
 * @default 7
 */
export const paginateURL = (
	searchParams: Readonly<URLSearchParams>,
	take = 7,
): string => {
	const query = new URLSearchParams(searchParams);
	const page = Number(query.get("page") || "1");
	const skip = (page - 1) * take;

	query.delete("page");

	query.set("skip", skip.toString());
	query.set("take", take.toString());
	return query.toString();
};
