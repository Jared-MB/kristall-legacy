"use client";

// import { useBankAccountsContext } from "@/app/sales/context/bank-accounts.context";
import { InputContainer, InputError } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useErrorsContext } from "../../context/errors.context";

export default function Transfer() {
	// const bankAccounts = useBankAccountsContext();
	const errors = useErrorsContext();

	// if (!bankAccounts || bankAccounts.length === 0) {
	// 	return "No hay cuentas de banco disponibles";
	// }

	return (
		<InputContainer>
			<Label>Cuenta de banco</Label>
			<Select name="bankAccount">
				<SelectTrigger>
					<SelectValue placeholder="Selecciona una cuenta de banco..." />
				</SelectTrigger>
				<SelectContent>
					{/* {bankAccounts.map((bankAccount) => (
						<SelectItem key={bankAccount._id} value={bankAccount._id}>
							{bankAccount.bank} - {bankAccount.accountNumber}
						</SelectItem>
					))} */}
				</SelectContent>
			</Select>
			{errors.length > 0 && errors[0].field === "bankAccount" && (
				<InputError>{errors[0].message}</InputError>
			)}
		</InputContainer>
	);
}
