"use client";

import { getLocations } from "@/actions/location.actions";
import { Button } from "@/components/ui/button";
import { CheckboxLabel } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTrigger,
} from "@/components/ui/dialog";
import { InputContainer } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/core/hooks";
import type { Order } from "@/types/order";
import { getHeaders } from "@/utils/auth.utils";
import type { CheckedState } from "@radix-ui/react-checkbox";
import { useQuery } from "@tanstack/react-query";
import { Printer } from "lucide-react";
import { type FormEvent, Fragment, useRef, useState } from "react";

import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";

const PrintOrders = ({
	ref: _ref,
	...props
}: { cookie: string } & {
	ref?: React.RefObject<HTMLDivElement>;
}) => {
	const printRef = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);

	const { data: locations } = useQuery({
		queryKey: ["locations"],
		queryFn: () => getLocations(),
	});

	const { promiseToast, resolveToast } = useToast();
	const [selectedStatus, setSelectedStatus] = useState<CheckedState>(true);
	const [orders, setOrders] = useState<Partial<Order>[]>([]);
	// const { register, control } = useForm();

	// const status = useWatch({ control, name: "status" });

	// useEffect(() => {
	// 	console.log(status);
	// }, [status]);
	const handlePrint = useReactToPrint({
		documentTitle: "Print This Document",
		onBeforePrint: async () => resolveToast("Listo para imprimir..."),
		// onAfterPrint: () => console.log("after printing..."),
		contentRef: printRef,
	});

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		promiseToast("Obteniendo pedidos...");
		const rawData = new FormData(e.currentTarget);
		const data = Object.fromEntries(rawData.entries());
		const dataArray = Object.entries(data);
		const formattedData = dataArray.map(([key, value]) => {
			if (key === "status" || value === "") {
				return null;
			}
			if (value === "on") {
				return [key, true];
			}
			if (key === "status-select") {
				return ["status", value];
			}
		});
		const filteredData = formattedData.filter((data) => data !== null);
		const searchParams = new URLSearchParams(filteredData as any);

		const headers = getHeaders(props.cookie);

		if (!headers) {
			toast.error("Error al obtener los pedidos");
			return;
		}

		const response = await fetch(
			`${
				process.env.NEXT_PUBLIC_SERVER_API
			}/orders/print?${searchParams.toString()}`,
			{
				headers,
				method: "GET",
			},
		);
		if (!response.ok) {
			toast.error("Error al obtener los pedidos");
			return;
		}
		const orders = await response.json();
		setOrders(orders.data);
		setTimeout(() => {
			handlePrint();
		}, 300);
	};

	return (
		<Fragment>
			<Dialog>
				<DialogTrigger asChild>
					<div className="relative flex cursor-pointer items-center rounded-sm gap-x-2  px-2 py-1.5  text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
						<Printer />
						Imprimir pedidos
					</div>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<h4 className="text-2xl">Imprimir pedidos</h4>
					</DialogHeader>
					<DialogDescription>Configuración</DialogDescription>
					<form
						className="flex flex-col gap-y-4"
						onSubmit={(e) => handleSubmit(e)}
					>
						<InputContainer>
							<Label>Ubicación</Label>
							<Select name="location">
								<SelectTrigger>
									<SelectValue placeholder="Selecciona una ubicación" />
								</SelectTrigger>
								<SelectContent>
									{locations?.map((location) => (
										<SelectItem key={location._id} value={location._id}>
											{location.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</InputContainer>
						<InputContainer>
							<Label>Mostrar</Label>
							<div className="mt-1 flex flex-col gap-x-2 gap-y-3">
								<CheckboxLabel defaultChecked name="code" id="code">
									Código
								</CheckboxLabel>
								<CheckboxLabel
									defaultChecked
									id="status"
									name="status"
									checked={selectedStatus}
									onCheckedChange={setSelectedStatus}
								>
									Estatus
								</CheckboxLabel>
								<RadioGroup
									defaultValue="pending"
									name="status-select"
									className="ml-4"
									disabled={!selectedStatus}
								>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="all" id="all" />
										<Label
											className={
												selectedStatus
													? "text-zinc-300"
													: "text-muted-foreground"
											}
											htmlFor="all"
										>
											Todos
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="pending" id="pending" />
										<Label
											className={
												selectedStatus
													? "text-zinc-300"
													: "text-muted-foreground"
											}
											htmlFor="pending"
										>
											Pendientes
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="paid" id="paid" />
										<Label
											className={
												selectedStatus
													? "text-zinc-300"
													: "text-muted-foreground"
											}
											htmlFor="paid"
										>
											Pagados
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="cancelled" id="cancelled" />
										<Label
											className={
												selectedStatus
													? "text-zinc-300"
													: "text-muted-foreground"
											}
											htmlFor="cancelled"
										>
											Cancelados
										</Label>
									</div>
								</RadioGroup>
								<CheckboxLabel
									name="pendingPayment"
									defaultChecked
									id="pendingPayment"
								>
									Pago pendiente
								</CheckboxLabel>
								<CheckboxLabel name="total" id="total">
									Total
								</CheckboxLabel>
								<CheckboxLabel name="client" id="client">
									Cliente
								</CheckboxLabel>
								<CheckboxLabel name="date" id="date">
									Fecha
								</CheckboxLabel>
							</div>
						</InputContainer>
						<DialogFooter>
							<Button
								type="submit"
								// onClick={() => {
								// 	handlePrint(null, () => printRef.current);
								// }}
							>
								Imprimir
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
			<div className="hidden print:block" ref={printRef}>
				{/* {JSON.stringify(orders)} */}
				<header className="text-purple-500">Kristall</header>
				<div>
					{orders?.map((order) => {
						const attributes = Object.keys(order);
						return (
							<div key={order._id}>
								{attributes.map((attribute) => {
									const value = (order as Record<string, any>)[attribute];
									if (!value) return null;

									if (typeof value === "object") {
										return (
											<div>
												{attribute}:{" "}
												{Object.keys(value).map((key) => {
													return (
														<div>
															{key}: {value[key]}
														</div>
													);
												})}
											</div>
										);
									}

									return (
										<div>
											{attribute}: {(order as Record<string, any>)[attribute]}
										</div>
									);
								})}
							</div>
						);
					})}
				</div>
			</div>
		</Fragment>
	);
};

export default PrintOrders;

// export default function PrintOrders() {
// 	return <div>print-orders</div>;
// }
