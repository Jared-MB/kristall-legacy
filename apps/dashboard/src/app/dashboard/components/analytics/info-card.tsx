import { BorderBeam } from "@/components/ui/border-beam";
import { Card, CardBody } from "@kristall/ui/card";
import { cn } from "@kristall/ui/utils/cn";

export function InfoCard({
	title,
	icon,
	children,
	isNewVersion = false,
	className,
}: {
	title: string;
	icon: React.ReactNode;
	children?: React.ReactNode;
	isNewVersion?: boolean;
	className?: string;
}) {
	return (
		<Card className={cn("grow", className)}>
			{isNewVersion && (
				<BorderBeam size={100} colorFrom="#a855f7" colorTo="#fff" />
			)}
			<CardBody className="p-4">
				<h4 className="text-base text-zinc-400 flex items-center justify-between gap-x-2">
					{title}
					{icon}
				</h4>
				<span className="text-2xl h-full">{children}</span>
			</CardBody>
		</Card>
	);
}
