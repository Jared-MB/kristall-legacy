"use client";

import { AlertTriangle } from "lucide-react";
import { useActionState, useEffect, useState } from "react";

import { cancelSubscription } from "@kristall/core/stripe/cancel";
import { CANCEL_SUBSCRIPTION_CONFIRM } from "@kristall/core/stripe/constants/confirm-value";

import { Button } from "@kristall/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@kristall/ui/dialog";
import { SubmitButton } from "@kristall/ui/functional/submit-button";
import { Input, InputError } from "@kristall/ui/input";
import { Label } from "@kristall/ui/label";
import { Password } from "@kristall/ui/password";
import { Textarea } from "@kristall/ui/textarea";
import { toast } from "sonner";

export function CancelSubscriptionForm() {
	const [open, setOpen] = useState(false);
	const closeDialog = () => setOpen(false);

	const [state, dispatch] = useActionState(cancelSubscription, undefined);

	useEffect(() => {
		if (state?.message) {
			toast.error(state.message);
			closeDialog();
			return;
		}
	}, [state]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant="destructive"
					className="bg-rose-600 hover:bg-rose-700 text-white"
				>
					Cancelar suscripción
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[480px] bg-[#1C1C1C] text-zinc-100 p-0 gap-0 overflow-y-auto max-h-[calc(100dvh-2rem)]">
				<DialogHeader className="p-6 pb-0">
					<DialogTitle className="text-2xl">Cancelar suscripción</DialogTitle>
					<p className="text-sm text-zinc-400 mt-2">
						Una vez cancelada, al finalizar el periodo de facturación, no podrás
						acceder a tu tienda y se deshabilitará el Virtual Showroom.
					</p>
				</DialogHeader>
				<form action={dispatch}>
					<div className="p-6 space-y-6">
						<div className="flex gap-2 text-rose-400 bg-rose-900/20 border border-rose-900/50 rounded-md p-4">
							<AlertTriangle className="h-5 w-5 shrink-0" />
							<p className="text-sm">
								<strong>Advertencia:</strong> al finalizar tu periodo de
								facturación, no podrás acceder a los servicios de{" "}
								<strong>Kristall</strong>
							</p>
						</div>
						<div className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="email">Correo electrónico</Label>
								<Input
									name="email"
									type="email"
									placeholder="example@email.com"
									defaultValue={state?.fields.email.value}
								/>
								{state?.fields.email.message && (
									<InputError>{state.fields.email.message}</InputError>
								)}
							</div>
							<div className="space-y-2">
								<Label htmlFor="password">Contraseña</Label>
								<Password
									name="password"
									type="password"
									placeholder="* * * * * * * *"
									defaultValue={state?.fields.password.value}
								/>
								{state?.fields.password.message && (
									<InputError>{state.fields.password.message}</InputError>
								)}
							</div>
							<div className="space-y-2">
								<p className="text-sm text-zinc-400">
									Para verificar, ingresa{" "}
									<strong className="text-purple-400">
										{CANCEL_SUBSCRIPTION_CONFIRM}
									</strong>
								</p>
								<Input
									name="confirm"
									defaultValue={state?.fields.confirm.value}
								/>
								{state?.fields.confirm.message && (
									<InputError>{state.fields.confirm.message}</InputError>
								)}
							</div>
							<div className="space-y-2 max-w-full">
								<p className="text-sm text-zinc-400">
									Por favor, ayúdanos a mejorar nuestros servicios dejando el
									motivo de tu cancelación. Este campo es opcional.
								</p>
								<Textarea
									placeholder="Tu motivo..."
									className="resize-none field-sizing w-full max-w-full"
								/>
							</div>
						</div>
					</div>
					<DialogFooter className="gap-2 border-t border-zinc-800 p-4">
						<Button type="button" variant="outline" onClick={closeDialog}>
							Cerrar
						</Button>
						<SubmitButton variant="destructive" pendingText="Confirmando...">
							Confirmar
						</SubmitButton>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
