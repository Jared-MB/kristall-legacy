import {
	Card,
	CardBody,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@kristall/ui/card";
import { ExternalLink, MoveRight } from "lucide-react";
import Link from "next/link";

interface Props {
	title: string;
	children: React.ReactNode;
	redirectTo: string;
}

export function SettingChange({ title, children, redirectTo }: Props) {
	return (
		<Card>
			<CardHeader>
				<div className="relative w-fit">
					{children}
					<div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-zinc-700/85 grid place-content-center">
						<MoveRight className="w-4 h-4 text-purple-500" />
					</div>
				</div>
			</CardHeader>
			<CardBody className="pt-0">
				<CardTitle>{title}</CardTitle>
				<CardDescription className="flex items-center gap-x-2">
					<span>Esta configuración se cambio a</span>
					<Link
						href={redirectTo}
						className="font-semibold text-purple-500 flex items-center gap-x-1"
					>
						{title} <ExternalLink className="w-4 h-4" />
					</Link>
				</CardDescription>
			</CardBody>
		</Card>
	);
}
