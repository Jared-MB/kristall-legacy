"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Banknote, CreditCard, DollarSign } from "lucide-react";
import { useMemo, useState, useActionState } from "react";
import { ErrorsProvider } from "../context/errors.context";
import {
	PaymentMethodProvider,
	type PaymentMethod as TPaymentMethod,
} from "../context/payment-method.context";
import { useShoppingCartStore } from "../store/shopping-cart.store";
import PaymentMethod from "./payment-method";
import Product from "./product";

export default function Payment() {
	const products = useShoppingCartStore((state) => state.cart);

	const [open, setOpen] = useState(false);
	const [paymentMethod, setPaymentMethod] = useState<TPaymentMethod>("cash");

	const subtotal = useMemo(() => {
		return products.reduce((acc, product) => {
			return acc + product.price * product.quantity;
		}, 0);
	}, [products]);

	const [response, dispatch] = useActionState(() => {}, undefined);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					className="border-purple-500"
					disabled={products.length === 0}
				>
					Pagar
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[600px] overflow-y-scroll max-h-[96dvh] py-8">
				<DialogHeader>
					<DialogTitle>Resumen de la compra</DialogTitle>
					<DialogDescription>
						Confirma los detalles de la compra
					</DialogDescription>
				</DialogHeader>
				<form action={dispatch} className="grid gap-6 ">
					<Card>
						<CardHeader>
							<CardTitle>Productos</CardTitle>
						</CardHeader>
						<CardContent className="grid gap-4">
							{products.map((product) => (
								<Product
									name={product.name}
									quantity={product.quantity}
									price={product.price}
									subtotal={product.price * product.quantity}
									key={product._id}
								/>
							))}
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Pago</CardTitle>
						</CardHeader>
						<CardContent className="grid gap-4">
							<div className="grid grid-cols-[1fr_auto] items-center gap-4">
								<div>Subtotal</div>
								<div className="font-medium">${subtotal}</div>
							</div>
							<div className="grid grid-cols-[1fr_auto] items-center gap-4 text-muted-foreground line-through">
								<div>Descuentos</div>
								<div className="font-medium">$0</div>
							</div>
							<Separator />
							<div className="grid grid-cols-[1fr_auto] items-center gap-4">
								<div className="font-medium">Total</div>
								<div className="font-medium">${subtotal}</div>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Método de pago</CardTitle>
						</CardHeader>
						<CardContent className="grid gap-4">
							<PaymentMethodProvider value={paymentMethod}>
								<RadioGroup
									onValueChange={(value) =>
										setPaymentMethod(value as TPaymentMethod)
									}
									value={paymentMethod}
									defaultValue="card"
									className="grid grid-cols-3 gap-4"
								>
									<div>
										<RadioGroupItem
											value="cash"
											id="cash"
											className="peer sr-only"
										/>
										<Label
											htmlFor="cash"
											className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
										>
											<DollarSign className="mb-3 h-6 w-6" />
											Efectivo
										</Label>
									</div>
									<div>
										<RadioGroupItem
											value="card"
											id="card"
											className="peer sr-only"
										/>
										<Label
											htmlFor="card"
											className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
										>
											<CreditCard className="mb-3 h-6 w-6" />
											Tarjeta
										</Label>
									</div>

									<div>
										<RadioGroupItem
											value="transfer"
											id="transfer"
											className="peer sr-only"
										/>
										<Label
											htmlFor="transfer"
											className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
										>
											<Banknote className="mb-3 h-6 w-6" />
											Transferencia
										</Label>
									</div>
								</RadioGroup>
								<ErrorsProvider
									value={
										typeof response === "object"
											? // biome-ignore lint/suspicious/noExplicitAny: <explanation>
												(response as unknown as any).error
											: []
									}
								>
									<PaymentMethod />
								</ErrorsProvider>
							</PaymentMethodProvider>
						</CardContent>
						<CardFooter>
							<Button className="w-full" type="submit">
								Confirmar pago
							</Button>
						</CardFooter>
					</Card>
				</form>
			</DialogContent>
		</Dialog>
	);
}
