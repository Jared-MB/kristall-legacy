import BreadcrumbNavigation from "./breadcrumb-navigation";

interface Props {
	children?: React.ReactNode;
	endContent?: React.ReactNode;
}

export default function Header({ children, endContent }: Props) {
	return (
		<header className="border-b border-b-zinc-700 flex justify-between items-center px-4 print:hidden w-full">
			<div className="flex flex-row items-center gap-x-4">
				<h2 className="text-2xl">{children}</h2>
				<span>|</span>
				<BreadcrumbNavigation />
			</div>
			{endContent}
		</header>
	);
}
