import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export const Card = forwardRef<
	HTMLDivElement,
	{
		children: React.ReactNode;
		variant?: "default" | "destructive" | "borderless" | "container";
		className?: string;
	}
>(({ children, variant, className }, ref) => (
	<section
		ref={ref}
		className={cn(
			"flex flex-col [border:1px_solid_rgba(255,255,255,.1)] rounded relative print:m-8",
			{
				"border-destructive": variant === "destructive",
			},
			variant === "borderless" && "border-none shadow-lg bg-zinc-800/10",
			variant === "container" && "!bg-transparent !border-none",
			className,
		)}
	>
		{children}
	</section>
));
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
	return (
		<h3 className="text-2xl font-medium text-balance flex flex-row items-center">
			{children}
		</h3>
	);
}

export function CardSubtitle({ children }: { children: React.ReactNode }) {
	return (
		<h4 className="text-[1.37rem] font-medium text-zinc-300">{children}</h4>
	);
}

export function CardDescription({ children }: { children: React.ReactNode }) {
	return <p className="text-zinc-300/60 text-sm text-pretty">{children}</p>;
}

type CardBodyProps = {
	children: React.ReactNode;
	className?: string;
};
export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
	({ children, className }, ref) => {
		return (
			<article ref={ref} className={`p-6 flex flex-col gap-y-2 ${className}`}>
				{children}
			</article>
		);
	},
);

CardBody.displayName = "CardBody";

export function CardFooter({
	children,
	className,
}: { children: React.ReactNode; className?: string }) {
	return (
		<footer
			className={cn(
				"bg-zinc-950/50 rounded-b px-6 py-5 flex flex-row items-center",
				className,
			)}
		>
			{children}
		</footer>
	);
}
