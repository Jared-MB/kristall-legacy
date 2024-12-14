import { cn } from "@kristall/ui/core/utils";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button, type ButtonProps } from "../ui/button";

interface Props extends ButtonProps {
	pendingText?: string;
	loading?: boolean;
}

export function SubmitButton({
	children,
	pendingText = "Loading...",
	className,
	loading,
	disabled = false,
	...props
}: Props) {
	const { pending } = useFormStatus();

	return (
		<Button
			disabled={pending || loading || disabled}
			className={cn("flex flex-row items-center gap-x-2", className)}
			type="submit"
			{...props}
		>
			{(pending || loading) && <Loader2 className="loader mr-2" />}
			{pending || loading ? pendingText : children}
		</Button>
	);
}
