import { cn } from "@/core/utils";

export function Item({ children }: { children: React.ReactNode }) {
	return <div className="flex flex-col gap-y-0.5">{children}</div>;
}

export function ItemTitle({ children }: { children: React.ReactNode }) {
	return <h4 className="font-medium">{children}</h4>;
}

export function ItemValue({
	children,
	className,
}: { children: React.ReactNode; className?: string }) {
	return (
		<p className={cn("text-zinc-300/60 text-sm capitalize", className)}>
			{children}
		</p>
	);
}
