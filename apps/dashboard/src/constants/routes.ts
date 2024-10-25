const BASE_URL = "/dashboard";

const Routes = {
	DASHBOARD: `${BASE_URL}`,
	SALES: `${BASE_URL}/sales`,
	INVENTORY: `${BASE_URL}/inventory?page=1`,
	LOCATIONS: `${BASE_URL}/locations`,
	BATCHES: `${BASE_URL}/batches`,
	ORDERS: `${BASE_URL}/orders`,
	CUSTOMERS: `${BASE_URL}/customers`,
	NOTES: `${BASE_URL}/notes`,
	EXPENSES: `${BASE_URL}/expenses`,
	USERS: `${BASE_URL}/users`,
	SETTINGS: `${BASE_URL}/settings`,
};

export default Routes;
