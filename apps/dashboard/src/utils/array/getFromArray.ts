export const getFromArray = (
	array: Array<{ [key: string]: string }>,
	key: string,
	value: string,
) => {
	return array.find((item) => item[key] === value);
};
