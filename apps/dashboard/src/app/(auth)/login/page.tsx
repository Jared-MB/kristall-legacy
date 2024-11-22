"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";

import SubmitButton from "@/components/submit-button";
import { Input, InputContainer, InputError } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Password } from "@/components/ui/password";
import { auth } from "@kristall/core/modules/auth";
import { toast } from "sonner";

export default function LoginForm() {
	const [errors, dispatch] = useFormState(auth.login, undefined);

	useEffect(() => {
		errors && "message" in errors && toast.error(errors.message);
	}, [errors]);

	return (
		<form action={dispatch} className="flex flex-col gap-y-4">
			<InputContainer>
				<Label htmlFor="username">Usuario</Label>
				<Input id="username" name="username" placeholder="username" />
				{errors && "username" in errors && (
					<InputError>{errors.username}</InputError>
				)}
			</InputContainer>
			<InputContainer>
				<Label htmlFor="password">Contraseña</Label>
				<Password id="password" name="password" />
				{errors && "password" in errors && (
					<InputError>{errors.password}</InputError>
				)}
			</InputContainer>
			<SubmitButton pendingText="Iniciando sesión...">
				Iniciar sesión
			</SubmitButton>
		</form>
	);
}
