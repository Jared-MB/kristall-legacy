"use client";

export default function ShoppingCartPayment({ total }: { total: number }) {
	// const { register, handleSubmit, control, setValue } =
	// 	useForm<PaymentValidator>({
	// 		resolver: zodResolver(PaymentValidatorSchema),
	// 	});

	// const onSubmit: SubmitHandler<PaymentValidator> = (data) => {};

	// const handleSelect = (
	// 	key: PaymentValidatorKeys,
	// 	value: PaymentValidator["paymentMethod"] | PaymentValidator["bankAccount"],
	// ) => {
	// 	setValue(key, value);
	// };

	// const paymentMethod = useWatch({
	// 	control,
	// 	name: "paymentMethod",
	// });

	// useEffect(() => {
	// 	console.log(paymentMethod);
	// }, [paymentMethod]);

	return (
		<>No longer used</>
		// <Dialog>
		// 	<DialogTrigger asChild>
		// 		<Button>Pagar</Button>
		// 	</DialogTrigger>
		// 	<DialogContent>
		// 		<DialogHeader className="flex flex-row justify-between items-center">
		// 			<h3 className="text-2xl font-medium">Pagar</h3>
		// 			<div className="text-xl">
		// 				<span className="text-zinc-400">Total:</span>{" "}
		// 				<span className="text-purple-500 text-2xl">${total}</span>
		// 			</div>
		// 		</DialogHeader>
		// 		<form
		// 			onSubmit={handleSubmit(onSubmit)}
		// 			className="flex flex-col gap-y-4"
		// 		>
		// 			<div className="grid items-center gap-1.5">
		// 				<Label htmlFor="paymentMethod">Método de pago</Label>
		// 				<Select
		// 					onValueChange={(value: PaymentValidator["paymentMethod"]) =>
		// 						handleSelect("paymentMethod", value)
		// 					}
		// 				>
		// 					<SelectTrigger>
		// 						<SelectValue placeholder="Selecciona un método de pago" />
		// 					</SelectTrigger>
		// 					<SelectContent>
		// 						<SelectItem value="cash">Efectivo</SelectItem>
		// 						<SelectItem value="card">Tarjeta</SelectItem>
		// 						<SelectItem value="transfer">Transferencia bancaria</SelectItem>
		// 					</SelectContent>
		// 				</Select>
		// 			</div>
		// 			{paymentMethod === "cash" && (
		// 				<InputContainer>
		// 					<Label htmlFor="cash">Efectivo</Label>
		// 					<Input id="cash" type="number" />
		// 				</InputContainer>
		// 			)}
		// 			{paymentMethod === "transfer" && (
		// 				<div className="grid items-center gap-1.5">
		// 					<Label htmlFor="paymentMethod">Cuenta bancaria</Label>
		// 					<Select
		// 						onValueChange={(value: PaymentValidator["bankAccount"]) =>
		// 							handleSelect("bankAccount", value)
		// 						}
		// 					>
		// 						<SelectTrigger>
		// 							<SelectValue placeholder="Selecciona una cuenta de banco" />
		// 						</SelectTrigger>
		// 						<SelectContent>
		// 							<SelectItem value="banamex">Banamex</SelectItem>
		// 							<SelectItem value="bancomer">Bancomer</SelectItem>
		// 							<SelectItem value="santander">Santander</SelectItem>
		// 						</SelectContent>
		// 					</Select>
		// 				</div>
		// 			)}
		// 			<DialogFooter className="mt-4">
		// 				<Button variant="secondary">Cancelar</Button>
		// 				<Button>Pagar</Button>
		// 			</DialogFooter>
		// 		</form>
		// 	</DialogContent>
		// </Dialog>
	);
}
