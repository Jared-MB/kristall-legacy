import { ORDER_STATUS } from ".";

export const ORDER_EXAMPLE = {
	_id: "1",
	code: "KLT-RANDEZ-000192",
	date: new Date(),
	location: {
		name: "Kristall",
		address: "Calle 1 # 2-3",
		phone: "1234567890",
	},
	payment: {
		_id: "1",
		total: 250,
		account: "BBVA",
		advance: 100,
		paymentMethod: "Transferencia",
		pendingPayment: 150,
	},
	products: [
		{
			name: "Producto 1",
			productId: "1",
			quantity: 2,
			price: 100,
			total: 200,
		},
		{
			name: "Producto 2",
			quantity: 1,
			productId: "2",
			price: 50,
			total: 50,
		},
	],
	status: "preparing" as keyof typeof ORDER_STATUS,
};

export interface ProductExample {
	_id: string;
	name: string;
	price: number;
	stock: number;
}

export const PRODUCTS_EXAMPLE = [
	{
		_id: "1",
		name: "Producto 1",
		price: 100,
		stock: 10,
	},
	{
		_id: "2",
		name: "Producto 2",
		price: 50,
		stock: 5,
	},
	{
		_id: "3",
		name: "Producto 3",
		price: 75,
		stock: 7,
	},
	{
		_id: "4",
		name: "Producto 4",
		price: 150,
		stock: 3,
	},
	{
		_id: "5",
		name: "Producto 5",
		price: 200,
		stock: 2,
	},
	{
		_id: "6",
		name: "Producto 6",
		price: 250,
		stock: 1,
	},
	{
		_id: "7",
		name: "Producto 7",
		price: 300,
		stock: 0,
	},
	{
		_id: "8",
		name: "Producto 8",
		price: 400,
		stock: 4,
	},
	{
		_id: "9",
		name: "Producto 9",
		price: 500,
		stock: 6,
	},
	{
		_id: "10",
		name: "Producto 10",
		price: 600,
		stock: 8,
	},
];
