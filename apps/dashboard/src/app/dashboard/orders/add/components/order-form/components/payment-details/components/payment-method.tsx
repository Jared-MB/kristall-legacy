"use client";

import {
	InputContainer,
	InputError,
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui";
import { bankAccount } from "@/core/modules/bank-account";
import { bankAccountSettings } from "@/core/modules/settings";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export default function PaymentMethod({
	error,
}: {
	error?: string[];
}) {
	const { setValue } = useFormContext();

	const { data: bankAccounts } = useQuery({
		queryKey: ["safeBankAccounts"],
		queryFn: async () => bankAccount.getSafeBankAccounts(),
	});

	const { data: hasEnabledBankAccounts } = useQuery({
		queryKey: ["shop-data"],
		queryFn: async () =>
			await bankAccountSettings.getEnableBankAccountSettings(),
	});

	const [paymentMethod, setPaymentMethod] = useState<string>("");

	const handlePaymentMethod = (value: string) => {
		setPaymentMethod(value);
		setValue("paymentMethod.type", value);
	};

	return (
		<>
			<InputContainer>
				<Label>Método de pago</Label>
				<Select onValueChange={(value) => handlePaymentMethod(value)}>
					<SelectTrigger>
						<SelectValue placeholder="Seleccionar método de pago" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="cash">Efectivo</SelectItem>
						<SelectItem value="card">Tarjeta</SelectItem>
						{hasEnabledBankAccounts && (
							<SelectItem value="transfer">Transferencia</SelectItem>
						)}
						<SelectItem value="pending">Pendiente</SelectItem>
					</SelectContent>
				</Select>
				{error && <InputError>{error[0]}</InputError>}
			</InputContainer>
			{paymentMethod === "transfer" && hasEnabledBankAccounts && (
				<InputContainer>
					<Label>Cuenta</Label>
					<Select
						onValueChange={(value) => setValue("paymentMethod.account", value)}
					>
						<SelectTrigger>
							<SelectValue placeholder="Seleccionar cuenta" />
						</SelectTrigger>
						<SelectContent>
							{bankAccounts?.map((account) => (
								<SelectItem key={account._id} value={account._id}>
									{account.bank} - {account.accountNumber}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</InputContainer>
			)}
		</>
	);
}
