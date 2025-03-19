"use client";

import { useActionState, useEffect } from "react";

import SubmitButton from "@/components/submit-button";
import { Input, InputContainer, InputError } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Password } from "@/components/ui/password";
import { login } from "@kristall/core/auth/login";
import { toast } from "sonner";

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
