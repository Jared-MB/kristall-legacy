import { cn } from "../../core/utils/cn";

function Announcement({
	children,
	position,
	className,
}: {
	children?: React.ReactNode | string;
	position?: "left" | "right";
	className?: string;
}) {
	return (
		<small
			className={cn(
				"absolute -bottom-1 text-purple-400 text-[10px] animate-pulse z-10",
				position === "right" ? "-right-1 -skew-y-6" : "-left-1 skew-y-6",
				className,
			)}
		>
			{children}
		</small>
	);
}

export function ComingSoon({
	children = "¡Próximamente!",
	position = "left",
	className,
}: {
	children?: React.ReactNode | string;
	position?: "left" | "right";
	className?: string;
}) {
	return (
		<Announcement position={position} className={className}>
			{children}
		</Announcement>
	);
}

export function NewFeature({
	children = "¡Nueva funcionalidad!",
	position = "left",
	className,
}: {
	children?: React.ReactNode | string;
	position?: "left" | "right";
	className?: string;
}) {
	return (
		<Announcement
			position={position}
			className={cn("text-green-400", className)}
		>
			{children}
		</Announcement>
	);
}

export function BetaFeature({
	children = "¡Funcionalidad en versión beta!",
	position = "left",
	className,
}: {
	children?: React.ReactNode | string;
	position?: "left" | "right";
	className?: string;
}) {
	return (
		<Announcement
			position={position}
			className={cn("text-yellow-400", className)}
		>
			{children}
		</Announcement>
	);
}
