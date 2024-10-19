import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { ReactNode, forwardRef } from "react";
import { Card } from "./card";

type BentoGridProps = {
	children: ReactNode;
	className?: string;
};

const BentoGrid = forwardRef<HTMLDivElement, BentoGridProps>(
	({ children, className }, ref) => {
		return (
			<div
				ref={ref}
				className={`grid w-full auto-rows-[20rem] grid-cols-3 gap-2 relative ${className}`}
			>
				{children}
			</div>
		);
	},
);

BentoGrid.displayName = "BentoGrid";

const BentoCard = ({
	name,
	className,
	background,
	Icon,
	description,
	href,
	cta,
}: {
	name: string | null;
	className: string | null;
	background: ReactNode | null;
	Icon: any | null;
	description: string | null;
	href: string | null;
	cta: string | null;
}) => (
	<Card
		key={name}
		className={cn(
			"group relative col-span-3 flex flex-col justify-between overflow-hidden",
			// light styles
			"[box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
			// dark styles
			"transform-gpu dark:inner-shadow",
			className,
		)}
	>
		<div>{background}</div>
		{name && description && (
			<div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
				<Icon className="h-12 w-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75" />
				<h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
					{name}
				</h3>
				<p className="max-w-lg text-neutral-400">{description}</p>
			</div>
		)}
		{cta && (
			<div
				className={cn(
					"pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
				)}
			>
				<Button
					variant="ghost"
					asChild
					size="sm"
					className="pointer-events-auto"
				>
					<Link href={href ?? ""}>
						{cta}
						<ArrowRightIcon className="ml-2 h-4 w-4" />
					</Link>
				</Button>
			</div>
		)}
		<div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
	</Card>
);

export { BentoCard, BentoGrid };
