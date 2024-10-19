import ComingSoon from "@/components/coming-soon";
import { cn } from "@/core/utils";
import Link from "next/link";
import SettingsLinkTab from "./settings-link-tab";

export default function SettingsLink({
	href,
	children,
	disabled = false,
	orientation,
	layoutId,
	className,
}: {
	href: `/dashboard/settings${string}`;
	children: React.ReactNode;
	disabled?: boolean;
	orientation?: "horizontal" | "vertical";
	layoutId?: string;
	className?: string;
}) {
	return (
		<li className="relative flex items-center justify-center">
			{disabled ? (
				<button
					type="button"
					disabled
					className="relative z-20 px-3 py-1 disabled:text-zinc-600 rounded transition-background"
				>
					{children}
					<ComingSoon />
				</button>
			) : (
				<Link
					className={cn(
						"relative z-20 px-3 py-1 hover:bg-zinc-700/40 rounded flex items-center w-full transition-background",
						className,
					)}
					href={href}
				>
					{children}
				</Link>
			)}
			<SettingsLinkTab
				href={href}
				orientation={orientation}
				layoutId={layoutId}
			/>
		</li>
	);
}
