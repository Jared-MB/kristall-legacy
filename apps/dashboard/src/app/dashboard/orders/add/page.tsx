import OrderContextProvider from "./_context";
import { getCustomers, getProducts } from "./components/_adapters";
import OrderForm from "./components/order-form";

export default async function AddOrderPage(props: {
	searchParams: Promise<string>;
}) {
	const searchParams = await props.searchParams;
	const productsPromise = getProducts(new URLSearchParams(searchParams));
	const clientsPromise = getCustomers(new URLSearchParams(searchParams));

	const [products, clients] = await Promise.all([
		productsPromise,
		clientsPromise,
	]);

	return (
		<main className="p-8 h-layout overflow-y-auto">
			<section className="mb-4">
				<h2 className="text-2xl mb-3 text-balance">Crear pedido</h2>
				<p className="text-pretty">
					Completa los campos para crear un nuevo pedido. Los campos marcados
					con * son obligatorios.
				</p>
			</section>
			<OrderContextProvider
				value={{
					products,
					clients,
				}}
			>
				<OrderForm />
			</OrderContextProvider>
		</main>
	);
}
