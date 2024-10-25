// Dependencies

// Core
import { bankAccountSettings } from "@kristall/core/modules/settings";

// Components
import Setting from "../components/setting";

// UI
import Divider from "@/components/divider";
import SubmitButton from "@/components/submit-button";
import {
	Card,
	CardBody,
	CardDescription,
	CardFooter,
	CardHeader,
	CardSubtitle,
	CardTitle,
} from "@/components/ui/card";
import { CheckboxLabel } from "@/components/ui/checkbox";
import { Input, InputContainer } from "@/components/ui/input";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { bankAccount } from "@/core/modules/bank-account";
import Accounts from "./components/accounts";

export default async function BankAccountsPage() {
	const enableBankAccounts =
		await bankAccountSettings.getEnableBankAccountSettings();
	const removeBankAccounts =
		await bankAccountSettings.getRemoveBankAccountSettings();

	return (
		<Setting>
			<CardTitle>Cuentas bancarias</CardTitle>
			<Card>
				<CardHeader>
					<CardTitle>Habilitar cuentas bancarias</CardTitle>
					<CardDescription>
						<span className="text-zinc-400 font-semibold">
							No es un procesador de pago
						</span>
						, solo se utiliza indicar a tus clientes cuál es el banco y la
						cuenta bancaria a la que se deba enviar la transferencia en caso de
						que ese sea el método de pago que elijas.
					</CardDescription>
					<form
						action={bankAccountSettings.updateEnableBankAccountSettings}
						className="flex flex-row gap-x-2 items-center pt-2"
					>
						<Switch type="submit" defaultChecked={enableBankAccounts} />
						<Label>Habilitado</Label>
					</form>
				</CardHeader>
				<Divider />
				<CardBody>
					<CardHeader className="p-0">
						<CardSubtitle>Configuración</CardSubtitle>
					</CardHeader>
					<form action={bankAccountSettings.updateRemoveBankAccountSettings}>
						<CheckboxLabel
							id="removeBankAccounts"
							defaultChecked={removeBankAccounts}
							type="submit"
						>
							Eliminar cuentas bancarias al deshabilitar
						</CheckboxLabel>
					</form>
				</CardBody>
				<Divider />
				<form action={bankAccount.uploadBankAccount}>
					<CardBody>
						<div className="grid grid-cols-2 gap-4">
							<InputContainer>
								<Label htmlFor="bankName">Nombre del banco</Label>
								<Input
									type="text"
									id="bankName"
									name="bank"
									placeholder="BBVA"
									disabled={!enableBankAccounts}
								/>
							</InputContainer>
							<InputContainer>
								<Label htmlFor="owner">Nombre del titular</Label>
								<Input
									type="text"
									id="owner"
									placeholder="Juan Pérez Sánchez"
									name="owner"
									disabled={!enableBankAccounts}
								/>
							</InputContainer>
							<InputContainer className="col-span-2">
								<Label htmlFor="clabe">CLABE interbancaria</Label>
								<InputOTP
									disabled={!enableBankAccounts}
									maxLength={18}
									id="clabe"
									name="clabe"
								>
									<InputOTPGroup>
										<InputOTPSlot index={0} />
										<InputOTPSlot index={1} />
										<InputOTPSlot index={2} />
									</InputOTPGroup>
									<InputOTPSeparator />
									<InputOTPGroup>
										<InputOTPSlot index={3} />
										<InputOTPSlot index={4} />
										<InputOTPSlot index={5} />
									</InputOTPGroup>
									<InputOTPSeparator />
									<InputOTPGroup>
										<InputOTPSlot index={6} />
										<InputOTPSlot index={7} />
										<InputOTPSlot index={8} />
										<InputOTPSlot index={9} />
									</InputOTPGroup>
									<InputOTPSeparator />
									<InputOTPGroup>
										<InputOTPSlot index={10} />
										<InputOTPSlot index={11} />
										<InputOTPSlot index={12} />
										<InputOTPSlot index={13} />
									</InputOTPGroup>
									<InputOTPSeparator />
									<InputOTPGroup>
										<InputOTPSlot index={14} />
										<InputOTPSlot index={15} />
										<InputOTPSlot index={16} />
										<InputOTPSlot index={17} />
									</InputOTPGroup>
								</InputOTP>
							</InputContainer>
							<InputContainer>
								<Label htmlFor="accountNumber">
									Número de cuenta{" "}
									<small className="text-zinc-500">(opcional)</small>
								</Label>
								<InputOTP
									maxLength={11}
									id="accountNumber"
									name="accountNumber"
									disabled={!enableBankAccounts}
								>
									<InputOTPGroup>
										<InputOTPSlot index={0} />
										<InputOTPSlot index={1} />
										<InputOTPSlot index={2} />
									</InputOTPGroup>
									<InputOTPSeparator />
									<InputOTPGroup>
										<InputOTPSlot index={3} />
										<InputOTPSlot index={4} />
										<InputOTPSlot index={5} />
									</InputOTPGroup>
									<InputOTPSeparator />
									<InputOTPGroup>
										<InputOTPSlot index={6} />
										<InputOTPSlot index={7} />
										<InputOTPSlot index={8} />
										<InputOTPSlot index={9} />
									</InputOTPGroup>
									<InputOTPSeparator />
									<InputOTPGroup>
										<InputOTPSlot index={10} placeholder="-" />
									</InputOTPGroup>
								</InputOTP>
							</InputContainer>
						</div>
					</CardBody>
					<Divider />
					<CardFooter className="justify-end">
						<SubmitButton
							disabled={!enableBankAccounts}
							pendingText="Guardando..."
						>
							Guardar
						</SubmitButton>
					</CardFooter>
				</form>
			</Card>
			{enableBankAccounts && <Accounts />}
		</Setting>
	);
}
