import { cn } from "@/core/utils";

export default function Setting({
	children,
	className,
}: { children: React.ReactNode; className?: string }) {
	return (
		<main className={cn("py-2 px-6 flex flex-col gap-y-6 mb-3", className)}>
			{children}
		</main>
	);
}
