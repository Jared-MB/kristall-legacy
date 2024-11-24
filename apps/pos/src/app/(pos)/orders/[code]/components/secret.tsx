"use client";

import { SubmitButton } from "@/components/functional/submit-button";
import { InputContainer } from "@/components/ui/input";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { deliverOrder } from "@/core/modules/orders";
import { PackageCheck } from "lucide-react";
import { useEffect, useActionState } from "react";
import { toast } from "sonner";

export default function SecretForm({
	code,
	isReady,
}: { code: string; isReady: boolean }) {
	const [error, dispatch] = useActionState(deliverOrder, undefined);

	useEffect(() => {
		error && toast.error(error);
	}, [error]);

	return (
		<form className="flex items-end justify-between gap-x-4" action={dispatch}>
			<input type="hidden" id="code" name="code" value={code} />
			<InputContainer>
				<Label htmlFor="secret">Secreto</Label>
				<InputOTP disabled={!isReady} maxLength={4} id="secret" name="secret">
					<InputOTPGroup>
						<InputOTPSlot index={0} />
					</InputOTPGroup>
					<InputOTPSeparator />
					<InputOTPGroup>
						<InputOTPSlot index={1} />
					</InputOTPGroup>
					<InputOTPSeparator />
					<InputOTPGroup>
						<InputOTPSlot index={2} />
					</InputOTPGroup>
					<InputOTPSeparator />
					<InputOTPGroup>
						<InputOTPSlot index={3} />
					</InputOTPGroup>
				</InputOTP>
			</InputContainer>
			<SubmitButton
				disabled={!isReady}
				pendingText="Entregando pedido"
				icon={<PackageCheck />}
			>
				Marcar como entregado
			</SubmitButton>
		</form>
	);
}
