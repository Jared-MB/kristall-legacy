import { cn } from "@kristall/ui/utils/cn";
import Link from "next/link";

interface Props {
	children?: React.ReactNode;
	className?: string;
	shopName: string;
}

export function Header({ children, shopName, className }: Props) {
	return (
		<header
			className={cn("h-20 p-6 flex items-center justify-between", className)}
		>
			<h1 className="text-4xl font-serif text-[var(--vs-custom-400)]">
				<Link href="/" className="capitalize">
					{shopName.replaceAll("-", " ")}
				</Link>
			</h1>
			{children}
		</header>
	);
}
