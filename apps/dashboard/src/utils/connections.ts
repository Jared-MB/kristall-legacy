import type { BestSeller } from "@/types/product";
import { ServerConnection } from "./ServerConnection";

// #region CATEGORIES
/**
 * @deprecated
 */
export const CategoriesConnection = new ServerConnection("/categories");

// #region PRODUCTS
/**
 * @deprecated
 */
export const ProductsConnection = new ServerConnection("/products");
/**
 * @deprecated
 */
export const ProductConnection = (id: string) =>
	new ServerConnection(`/products/id/${id}`);
/**
 * @deprecated
 */
export const getBestSellingProducts = async () => {
	const products = await new ServerConnection(
		"/products/best-sellers?take=10&skip=0",
	).get<BestSeller[]>();
	return products;
};
/**
 * @deprecated
 */
export const InventoryCutOffConnection = new ServerConnection(
	"/products/inventory-cut-off",
);

// #region ORDERS
/**
 * @deprecated
 */
export const OrderConnection = (code: string) =>
	new ServerConnection(`/orders/${code}`);
/**
 * @deprecated
 */
export const OrdersConnection = new ServerConnection("/orders");
/**
 * @deprecated
 */
export const LatestOrdersConnection = new ServerConnection("/orders/latest");
/**
 * @deprecated
 */
export const CountPendingOrders = new ServerConnection("/orders/pending");
/**
 * @deprecated
 */
export const UpdateOrderConnection = (id: string) =>
	new ServerConnection(`/orders/update-order/${id}`);

//  #region LOCATIONS
/**
 * @deprecated
 */
export const LocationsConnection = new ServerConnection("/locations");
/**
 * @deprecated
 */
export const LocationConnection = (id: string) =>
	new ServerConnection(`/locations/${id}`);

// #region CUSTOMERS
/**
 * @deprecated
 */
export const CustomersConnection = new ServerConnection("/clients");
/**
 * @deprecated
 */
export const CustomerConnection = (id: string) =>
	new ServerConnection(`/clients/${id}`);

// #region SHOP
/**
 * @deprecated
 */
export const ShopConnection = new ServerConnection("/shop/name");
/**
 * @deprecated
 */
export const ShopLogoConnection = new ServerConnection("/shops/logo");

// #region BANK ACCOUNTS
/**
 * @deprecated
 */
export const BankAccountsConnection = new ServerConnection("/bank-accounts");
/**
 * @deprecated
 */
export const SafeBankAccountsConnection = new ServerConnection(
	"/bank-accounts/safe",
);

// #region USERS
/**
 * @deprecated
 */
export const UsersConnection = new ServerConnection("/users");

// #region ANALYTICS
/**
 * @deprecated
 */
export const AnalyticsConnection = new ServerConnection("/analytics");

// #region EXPENSES
/**
 * @deprecated
 */
export const ExpensesConnection = new ServerConnection("/expenses");
