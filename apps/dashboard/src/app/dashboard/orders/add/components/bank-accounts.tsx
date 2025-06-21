import { getBankAccounts } from "@kristall/core/bank-accounts/all";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@kristall/ui/select";

export async function BankAccounts() {
	const bankAccounts = await getBankAccounts();

	return (
		<Select name="bankAccount">
			<SelectTrigger>
				<SelectValue placeholder="Seleccionar cuenta bancaria" />
			</SelectTrigger>
			<SelectContent>
				{bankAccounts && bankAccounts.length > 0 ? (
					bankAccounts.map((account) => (
						<SelectItem key={account._id} value={account._id}>
							{account.bank} - {account.accountNumber}
						</SelectItem>
					))
				) : (
					<SelectItem value="no-bank-accounts" disabled>
						No hay cuentas bancarias
					</SelectItem>
				)}
			</SelectContent>
		</Select>
	);
}
