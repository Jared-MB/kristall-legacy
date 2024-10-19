/***
 * Remove an array from another array
 * @param mainArray The main array
 * @param arrayToRemove The array to remove from the main array
 * @param key The key to compare the arrays, if the key from the main arrays is different you can specify the main key
 * @param mainKey  If the key to compare is different on both arrays you can specify the main key
 * @return The main array without the array to remove
 */
export const removeArrayFromArray = (
	mainArray: Record<string, any>[],
	arrayToRemove: Record<string, any>[],
	key: string,
	mainKey?: string,
) => {
	return mainArray.filter(
		(item) =>
			!arrayToRemove.some(
				(removeItem) => removeItem[key] === item[mainKey ?? key],
			),
	);
};

export const sumArray = (array: Record<string, any>[], key: string) => {
	return array.reduce((acc, item) => acc + item[key], 0);
};
