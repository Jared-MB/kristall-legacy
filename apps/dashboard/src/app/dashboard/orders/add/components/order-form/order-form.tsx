"use client";

import Divider from "@/components/divider";
import SubmitButton from "@/components/submit-button";
import { Card, CardFooter, buttonVariants } from "@/components/ui";
import { useCartStore } from "@/core/store";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { uploadOrder } from "../_adapters";
import type { AddOrder } from "../_interfaces";

import GeneralDetails from "./components/general-details";
import PaymentDetails from "./components/payment-details";
import ShoppingCart from "./components/shopping-cart";

export default function OrderForm() {
	const methods = useForm<AddOrder>();

	const cart = useCartStore((state) => state.cart);
	const clearCart = useCartStore((state) => state.clearCart);

	const enhancedAction = uploadOrder.bind(null, cart, methods.watch());

	const [errors, dispatch] = useActionState(enhancedAction, undefined);

	useEffect(() => {
		if (errors) {
			console.log(errors);
			"message" in errors && toast.error(errors.message);
			"cart" in errors && errors.cart && toast.error(errors.cart[0]);
		}
	}, [errors]);

	useEffect(() => {
		return () => {
			clearCart();
		};
	}, []);

	return (
		<FormProvider {...methods}>
			<form action={dispatch}>
				<Card>
					<ShoppingCart />
					<Divider />
					<GeneralDetails
						errors={{
							client: errors && "client" in errors ? errors.client : undefined,
							location:
								errors && "location" in errors ? errors.location : undefined,
						}}
					/>
					<Divider />
					<PaymentDetails
						errors={{
							advance:
								errors && "advance" in errors ? errors.advance : undefined,
							paymentMethod:
								errors && "paymentMethod" in errors
									? errors.paymentMethod
									: undefined,
						}}
					/>
					<CardFooter className="justify-end gap-x-4">
						<Link
							className={buttonVariants({
								variant: "outline",
							})}
							href="/dashboard/orders"
						>
							Cancelar
						</Link>
						<SubmitButton pendingText="Creando pedido...">
							Crear pedido
						</SubmitButton>
					</CardFooter>
				</Card>
			</form>
		</FormProvider>
	);
}
