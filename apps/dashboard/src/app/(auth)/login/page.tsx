"use client";

import { login } from "@kristall/client/services/user-management/use-cases/public/login";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { SubmitButton } from "@kristall/ui/functional/submit-button";
import { Input, InputContainer, InputError } from "@kristall/ui/input";
import { Label } from "@kristall/ui/label";
import { Password } from "@kristall/ui/password";

export default function LoginForm() {
	const [state, dispatch] = useActionState(login, undefined);

	useEffect(() => {
		state?.message && toast.error(state.message.value);
	}, [state]);

	return (
		<form action={dispatch} className="flex flex-col gap-y-4">
			<InputContainer>
				<Label htmlFor="username">Usuario</Label>
				<Input
					defaultValue={state?.fields.username.value}
					id="username"
					name="username"
					placeholder="username"
				/>
				{state?.fields.username.message && (
					<InputError>{state?.fields.username.message}</InputError>
				)}
			</InputContainer>
			<InputContainer>
				<Label htmlFor="password">Contraseña</Label>
				<Password
					defaultValue={state?.fields.password.value}
					id="password"
					name="password"
				/>
				{state?.fields.password.message && (
					<InputError>{state?.fields.password.message}</InputError>
				)}
			</InputContainer>
			<SubmitButton pendingText="Iniciando sesión...">
				Iniciar sesión
			</SubmitButton>
		</form>
	);
}
