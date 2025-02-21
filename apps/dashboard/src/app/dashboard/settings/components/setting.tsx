import { cn } from "@/core/utils";

export default function Setting({
	children,
	className,
}: { children: React.ReactNode; className?: string }) {
	return (
		<main className={cn("p-6 flex flex-col gap-y-6", className)}>
			{children}
		</main>
	);
}
