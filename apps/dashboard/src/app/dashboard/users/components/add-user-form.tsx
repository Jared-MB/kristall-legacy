"use client";

import SubmitButton from "@/components/submit-button";
import {
	CardBody,
	CardFooter,
	Input,
	InputContainer,
	Label,
} from "@/components/ui";
import { user } from "@/core/modules/users";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

export default function AddUserForm() {
	const [response, dispatch] = useActionState(user.uploadUser, undefined);
	const formRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		if (response) {
			console.log(response);
			if ("success" in response && response.success) {
				toast.success(response.success[0]);
				formRef.current?.reset();
				return;
			}
			if ("error" in response && response.error) {
				toast.error(response.error[0]);
				return;
			}
		}
	}, [response]);

	return (
		<form action={dispatch} ref={formRef}>
			<CardBody className="grid grid-cols-2 gap-4">
				<InputContainer>
					<Label>Correo electrónico</Label>
					<Input name="email" type="email" placeholder="usuario@correo.com" />
				</InputContainer>
				<InputContainer>
					<Label>Usuario</Label>
					<Input name="username" placeholder="usuario" />
				</InputContainer>
				<InputContainer
					classNames={{
						container: "col-span-2",
					}}
				>
					<Label>Nombre</Label>
					<Input name="name" placeholder="Nombre" />
				</InputContainer>
				<InputContainer>
					<Label>Contraseña</Label>
					<Input
						name="password"
						type="password"
						placeholder="* * * * * * * * * *"
					/>
				</InputContainer>
				<InputContainer>
					<Label>Confirmar contraseña</Label>
					<Input
						name="confirmPassword"
						type="password"
						placeholder="* * * * * * * * * *"
					/>
				</InputContainer>
			</CardBody>
			<CardFooter className="justify-end">
				<SubmitButton pendingText="Agregando usuario...">
					Agregar usuario
				</SubmitButton>
			</CardFooter>
		</form>
	);
}
