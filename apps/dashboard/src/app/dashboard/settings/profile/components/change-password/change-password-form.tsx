"use client";

import SubmitButton from "@/components/submit-button";
import { Input, InputContainer, InputError } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/core/modules/users";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function ChangePasswordForm() {
	const [response, dispatch] = useActionState(auth.updatePassword, undefined);

	useEffect(() => {
		if (typeof response === "string") {
			toast.success(response);
		}
	}, [response]);

	return (
		<form action={dispatch} className="flex flex-row items-end gap-x-4">
			<div className="flex flex-col gap-y-4 md:flex-row items-start md:w-3/4 gap-x-4">
				<InputContainer>
					<Label>Contraseña actual</Label>
					<Input
						placeholder="* * * * * * * * "
						type="password"
						name="password"
					/>
				</InputContainer>
				<InputContainer>
					<Label>Nueva contraseña</Label>
					<Input
						placeholder="* * * * * * * * "
						type="password"
						name="newPassword"
					/>
					{typeof response === "object" &&
						response.error[0].field === "password" && (
							<InputError>{response.error[0].message}</InputError>
						)}
				</InputContainer>
				<InputContainer>
					<Label>Confirmar nueva contraseña</Label>
					<Input
						placeholder="* * * * * * * * "
						type="password"
						name="confirmNewPassword"
					/>
					{typeof response === "object" &&
						response.error[0].field === "confirmNewPassword" && (
							<InputError>{response.error[0].message}</InputError>
						)}
				</InputContainer>
			</div>

			<SubmitButton pendingText="Actualizando...">
				Actualizar contraseña
			</SubmitButton>
		</form>
	);
}
