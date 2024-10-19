import { cn } from "@/core/utils";

export default function Svg({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div className={cn("w-hull h-auto fill-purple-500", className)}>
			{children}
		</div>
	);
}
