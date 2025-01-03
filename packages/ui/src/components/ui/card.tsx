import { cn } from "../../core/utils";

export const Card = ({
	ref,
	children,
	variant,
	className,
	as = "section",
}: {
	children: React.ReactNode;
	variant?: "default" | "destructive" | "borderless" | "container";
	className?: string;
	as?: "section" | "div" | "nav";
	ref?: React.RefObject<HTMLDivElement>;
}) => {
	const As = as;

	return (
		<As
			ref={ref}
			className={cn(
				"flex flex-col border border-border rounded relative print:m-8",
				variant === "destructive" && "!border-destructive",
				variant === "borderless" && "!border-none shadow-lg bg-zinc-800/10",
				variant === "container" && "!bg-transparent !border-none",
				className,
			)}
		>
			{children}
		</As>
	);
};
Card.displayName = "Card";

export function CardHeader({
	children,
	className,
}: { children: React.ReactNode; className?: string }) {
	return (
		<header
			className={cn("p-6 flex flex-col justify-center gap-y-1", className)}
		>
			{children}
		</header>
	);
}

export function CardTitle({ children }: { children: React.ReactNode }) {
	return <h3 className="text-2xl font-medium text-balance">{children}</h3>;
}

export function CardSubtitle({
	children,
	className,
}: { children: React.ReactNode; className?: string }) {
	return (
		<h4 className={cn("text-[1.37rem] font-medium text-zinc-300", className)}>
			{children}
		</h4>
	);
}

export function CardDescription({
	children,
	className,
}: { children: React.ReactNode; className?: string }) {
	return (
		<p className={cn("text-zinc-300/60 text-sm", className)}>{children}</p>
	);
}

export function CardBody({
	children,
	className,
	id,
	as = "article",
}: {
	children: React.ReactNode;
	className?: string;
	as?: "article" | "section" | "div";
	id?: string;
}) {
	const As = as;

	return (
		<As className={cn("p-6 flex flex-col grow gap-y-2", className)} id={id}>
			{children}
		</As>
	);
}

export function CardFooter({
	children,
	className,
}: { children: React.ReactNode; className?: string }) {
	return (
		<footer
			style={{ backgroundColor: "hsl(var(--card))" }}
			className={cn(
				"rounded-b px-6 py-5 flex flex-row items-center",
				className,
			)}
		>
			{children}
		</footer>
	);
}
