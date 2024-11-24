"use client";

import SubmitButton from "@/components/submit-button";
import {
	Input,
	InputContainer,
	InputDescription,
	InputError,
	Label,
} from "@/components/ui";
import { auth } from "@kristall/core/modules/auth";
import type { CustomerDetails } from "@kristall/core/modules/stripe/interfaces";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function RegisterForm({
	customer,
}: {
	customer: CustomerDetails;
}) {
	const [errors, dispatch] = useActionState(auth.register, undefined);

	useEffect(() => {
		errors && "message" in errors && toast.error(errors.message);
	}, [errors]);

	return (
		<form action={dispatch} className="flex flex-col gap-y-4">
			<InputContainer>
				<Label htmlFor="name">Nombre</Label>
				<Input
					id="name"
					name="name"
					placeholder="name"
					defaultValue={customer.name}
					readOnly
				/>
			</InputContainer>
			<InputContainer>
				<Label htmlFor="email">Correo</Label>
				<Input
					id="email"
					name="email"
					placeholder="email"
					type="email"
					defaultValue={customer.email}
					readOnly
				/>
			</InputContainer>
			<InputContainer>
				<Label htmlFor="username">Usuario</Label>
				<Input id="username" name="username" placeholder="username" />
				<InputDescription>
					Elige el nombre de usuario con el que iniciarás sesión.
				</InputDescription>
				{errors && "username" in errors && (
					<InputError>{errors.username}</InputError>
				)}
			</InputContainer>
			<InputContainer>
				<Label htmlFor="shopName">Nombre del negocio</Label>
				<Input id="shopName" name="shopName" placeholder="shopName" />
				<InputDescription>
					¿Cómo se llama tu negocio? Este nombre será visible para tus clientes.
				</InputDescription>
				{errors && "shopName" in errors && (
					<InputError>{(errors as any).shopName}</InputError>
				)}
			</InputContainer>
			<InputContainer>
				<Label htmlFor="password">Contraseña</Label>
				<Input
					id="password"
					name="password"
					type="password"
					placeholder="* * * * * * * * *"
				/>
				{errors && "password" in errors && (
					<InputError>{errors.password}</InputError>
				)}
			</InputContainer>
			<InputContainer>
				<Label htmlFor="confirmPassword">Confirmar contraseña</Label>
				<Input
					id="confirmPassword"
					name="confirmPassword"
					type="password"
					placeholder="* * * * * * * * *"
				/>
				{errors && "confirmPassword" in errors && (
					<InputError>{errors.confirmPassword}</InputError>
				)}
			</InputContainer>
			<SubmitButton pendingText="Registrando...">Registrarse</SubmitButton>
		</form>
	);
}
