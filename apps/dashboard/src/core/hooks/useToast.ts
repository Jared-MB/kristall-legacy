import { useId } from "react";
import { toast } from "sonner";

export function useToast() {
	const id = useId();

	const promiseToast = (message = "Cargando...") => {
		toast.loading(message, {
			id,
		});
	};

	const resolveToast = (
		message: string,
		status: "success" | "error" = "success",
	) => {
		if (status === "success") {
			toast.success(message, {
				id,
			});
			return;
		}
		toast.error(message, {
			id,
		});
	};

	return { promiseToast, resolveToast };
}
