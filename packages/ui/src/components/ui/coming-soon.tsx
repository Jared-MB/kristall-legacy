import { cn } from "../../core/utils/cn";

export function ComingSoon({
	children = "¡Próximamente!",
	position = "left",
}: {
	children?: React.ReactNode | string;
	position?: "left" | "right";
}) {
	return (
		<small
			className={cn(
				"absolute -bottom-1 text-purple-400 text-[10px] animate-pulse",
				position === "right" ? "-right-1 -skew-y-6" : "-left-1 skew-y-6",
			)}
		>
			{children}
		</small>
	);
}
