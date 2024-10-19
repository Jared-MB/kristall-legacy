const fillWithZeros = (number: number): string => {
  const length = 6;
  const numberString = number.toString();
  const zeros = length - numberString.length;
  let result = '';
  for (let i = 0; i < zeros; i++) {
    result += '0';
  }
  return result + numberString;
};

/**
 * Create a 3 letters code that take the first letter of each word in the shop name, if the shop name has only one word, it will take the first, the middle and the last letter of the word, on a 2 words name, it will take the first letter of each word and the last letter of the last word.
 * @param {string} shop - The shop name
 * @returns {string} A 3 letters code
 * @deprecated
 */
export const createShopNameCode = (shop: string): string => {
  const words = shop.split(' ');
  if (words.length === 1) {
    return (
      shop.slice(0, 1).toUpperCase() +
      shop.slice(shop.length / 2, shop.length / 2 + 1).toUpperCase() +
      shop.slice(-1).toUpperCase()
    );
  }
  if (words.length === 2) {
    return (
      words[0].slice(0, 1).toUpperCase() +
      words[1].slice(0, 1).toUpperCase() +
      words[1].slice(-1).toUpperCase()
    );
  }
  return (
    words[0].slice(0, 1).toUpperCase() +
    words[1].slice(0, 1).toUpperCase() +
    words[2].slice(0, 1).toUpperCase()
  );
};

/**
 * Generate a code for an order
 * @param {string} name - The client name
 * @param {string} shop - The shop name
 * @param {number} totalOrders - The total number of orders in the shop
 * @returns {string} A code for the order
 * @deprecated
 */
export const generateCode = (
  name: string,
  shop: string,
  totalOrders: number,
) => {
  const shopNameCode = createShopNameCode(shop);
  const firstInitials = name.slice(0, 3).toUpperCase().trim();
  const lastInitials = name.slice(-3).toUpperCase().trim();
  const trimmedName = removeBlankSpaces(firstInitials + lastInitials);
  const orderNumber = totalOrders + 1;
  return (
    shopNameCode +
    '-' +
    trimmedName +
    '-' +
    fillWithZeros(orderNumber)
  );
};

/**
 * @deprecated
 */
export const generateNoNameCode = (shop: string, totalOrders: number) => {
  const shopNameCode = createShopNameCode(shop);
  const orderNumber = totalOrders + 1;
  return shopNameCode + '-' + fillWithZeros(orderNumber);
};

const removeBlankSpaces = (string: string): string => {
  return string.replace(/\s/g, '');
}

/**
 * @deprecated
 */
// GENERATE A SECURITY CODE OF 4 DIGITS
export const generateSecurityCode = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
}