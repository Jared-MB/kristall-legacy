import { cn } from "@/core/utils";

export default function Divider({
	orientation = "horizontal",
	className,
}: { orientation?: "vertical" | "horizontal"; className?: string }) {
	if (orientation === "vertical")
		return (
			<div className={cn("w-full md:w-[1px] h-full bg-zinc-700", className)} />
		);
	return <hr className={cn("border-zinc-700", className)} />;
}
