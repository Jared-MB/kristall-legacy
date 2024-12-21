import { cn } from "@/core/utils";

interface Props {
	children: React.ReactNode;
	className?: string;
}

export function MainContent({ children, className }: Props) {
	return (
		<main className={cn("p-8 h-layout overflow-y-auto", className)}>
			{children}
		</main>
	);
}
