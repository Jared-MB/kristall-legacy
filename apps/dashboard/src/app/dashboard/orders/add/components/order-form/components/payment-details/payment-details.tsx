"use client";

import {
	CardBody,
	CardSubtitle,
	Input,
	InputContainer,
	InputError,
	Label,
} from "@/components/ui";
import { DollarSign } from "lucide-react";
import { useFormContext } from "react-hook-form";
import PaymentMethod from "./components/payment-method";

export default function PaymentDetails({
	errors,
}: {
	errors?: {
		advance?: string[];
		paymentMethod?: string[];
	};
}) {
	const { register } = useFormContext();

	return (
		<CardBody>
			<CardSubtitle>Detalles de pago</CardSubtitle>
			<div className="flex flex-row items-start gap-x-4">
				<PaymentMethod error={errors?.paymentMethod} />
				<InputContainer>
					<Label>Anticipo</Label>
					<Input
						{...register("advance")}
						type="number"
						icon={<DollarSign className="w-4 h-4" />}
						placeholder="0"
					/>
					{errors?.advance && <InputError>{errors.advance[0]}</InputError>}
				</InputContainer>
			</div>
		</CardBody>
	);
}
