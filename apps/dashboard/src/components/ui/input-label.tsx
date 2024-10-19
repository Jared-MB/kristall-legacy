import clsx from "clsx";
import { Input } from "./input";
import { Label } from "./label";

export default function InputLabel({
	id,
	label,
	placeholder,
	type = "text",
	classNames,
}: {
	id: string;
	label: string;
	placeholder?: string;
	type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
	classNames?: {
		container?: string;
		input?: {
			container?: string;
			input?: string;
		};
		label?: string;
	};
}) {
	return (
		<div
			className={clsx(
				"grid w-full max-w-sm items-center gap-1.5",
				classNames?.container,
			)}
		>
			<Label htmlFor={id} className={classNames?.label}>
				{label}
			</Label>
			<Input
				// {...register("username")}
				// label="Usuario"
				classNames={{
					container: classNames?.input?.container,
				}}
				name={id}
				placeholder={placeholder}
				id={id}
				type={type}
			/>
		</div>
	);
}
