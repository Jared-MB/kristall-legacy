import { DollarSign, ShoppingCartIcon } from "lucide-react";

import { Card, CardBody, CardSubtitle, CardTitle } from "@kristall/ui/card";
import { Search } from "@kristall/ui/functional/search";
import { Input, InputContainer } from "@kristall/ui/input";
import { Label } from "@kristall/ui/label";
import { Separator } from "@kristall/ui/separator";

import { BankAccounts } from "./components/bank-accounts";
import { Clients } from "./components/clients";
import { DeliveryLocation, Location } from "./components/location";
import { BankAccountsView, PaymentMethod } from "./components/payment-method";
import { PaymentView } from "./components/payment-view";
import { Products } from "./components/products";
import { ProductsViewSwitch } from "./components/products-view";
import { ShoppingCart } from "./components/shopping-cart";

export default async function AddOrderPage(props: {
	searchParams: Promise<Readonly<URLSearchParams>>;
}) {
	return (
		<main className="p-8 h-layout overflow-y-auto">
			<header className="mb-4 flex justify-between items-center">
				<CardTitle className="text-2xl">Nuevo pedido</CardTitle>
			</header>
			<Card>
				<div className="grid grid-cols-[1fr_1px_25%]">
					<div>
						<CardBody className="flex flex-col p-0">
							<header className="flex justify-between items-center p-6">
								<Search queryName="name" resetPage={false} showLabel={false} />
								<div className="flex gap-x-4 items-center">
									<Location />
									<ProductsViewSwitch />
								</div>
							</header>
							<Separator />
							<Products searchParams={props.searchParams} />
						</CardBody>
						<Separator />
						<CardBody className="flex flex-col gap-y-4">
							<header>
								<CardSubtitle>Detalles del pedido</CardSubtitle>
							</header>
							<div className="grid grid-cols-2 gap-4">
								<InputContainer>
									<Label>Ubicación de entrega</Label>
									<DeliveryLocation />
								</InputContainer>
								<InputContainer>
									<Label>Cliente</Label>
									<Clients />
								</InputContainer>
							</div>
						</CardBody>
						<Separator />
						<CardBody className="flex flex-col gap-y-4">
							<header>
								<CardSubtitle>Detalles del pago</CardSubtitle>
							</header>
							<PaymentView>
								<InputContainer>
									<Label>Método de pago</Label>
									<PaymentMethod />
								</InputContainer>
								<BankAccountsView>
									<InputContainer>
										<Label>Cuenta bancaria</Label>
										<BankAccounts />
									</InputContainer>
								</BankAccountsView>
								<InputContainer>
									<Label>Anticipo</Label>
									<Input
										type="number"
										placeholder="0"
										icon={<DollarSign className="size-4" />}
									/>
								</InputContainer>
							</PaymentView>
						</CardBody>
					</div>
					<Separator orientation="vertical" />
					<CardBody className="sticky -top-8 h-layout p-0">
						<header className="p-6">
							<CardSubtitle className="h-10 flex items-center">
								<ShoppingCartIcon className="mr-4" />
								<span>Carrito</span>
							</CardSubtitle>
						</header>
						<Separator />
						<ShoppingCart />
					</CardBody>
				</div>
			</Card>
		</main>
	);
}
