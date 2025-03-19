"use client";

import type { CustomerDetails } from "@kristall/core/interfaces/stripe";

import SubmitButton from "@/components/submit-button";
import {
	Input,
	InputContainer,
	InputDescription,
	InputError,
	Label,
} from "@/components/ui";
import { register } from "@kristall/core/auth/register";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function RegisterForm({
	customer,
}: {
	customer: CustomerDetails;
}) {
	const [errors, dispatch] = useActionState(register, undefined);

	useEffect(() => {
		errors?.message && toast.error(errors.message.value);
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
				<Input
					id="username"
					name="username"
					placeholder="username"
					defaultValue={errors?.fields.username.value}
				/>
				<InputDescription>
					Elige el nombre de usuario con el que iniciarás sesión.
				</InputDescription>
				{errors?.fields.username && (
					<InputError>{errors.fields.username.message}</InputError>
				)}
			</InputContainer>
			<InputContainer>
				<Label htmlFor="shopName">Nombre del negocio</Label>
				<Input
					id="shopName"
					name="shopName"
					placeholder="shopName"
					defaultValue={errors?.fields.shopName.value}
				/>
				<InputDescription>
					¿Cómo se llama tu negocio? Este nombre será visible para tus clientes.
				</InputDescription>
				{errors?.fields.shopName && (
					<InputError>{errors.fields.shopName.message}</InputError>
				)}
			</InputContainer>
			<InputContainer>
				<Label htmlFor="password">Contraseña</Label>
				<Input
					id="password"
					name="password"
					type="password"
					placeholder="* * * * * * * * *"
					defaultValue={errors?.fields.password.value}
				/>
				{errors?.fields.password && (
					<InputError>{errors.fields.password.message}</InputError>
				)}
			</InputContainer>
			<InputContainer>
				<Label htmlFor="confirmPassword">Confirmar contraseña</Label>
				<Input
					id="confirmPassword"
					name="confirmPassword"
					type="password"
					placeholder="* * * * * * * * *"
					defaultValue={errors?.fields.confirmPassword.value}
				/>
				{errors?.fields.confirmPassword && (
					<InputError>{errors.fields.confirmPassword.message}</InputError>
				)}
			</InputContainer>
			<SubmitButton pendingText="Registrando...">Registrarse</SubmitButton>
		</form>
	);
}
