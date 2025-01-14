import CopyToClipboard from "@/components/ui/copy-to-clipboard";
import { buttonVariants } from "@kristall/ui/button";
import { Card, CardHeader } from "@kristall/ui/card";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

export function VirtualShowroomUrl({ url }: { url: string }) {
	const parsedUrl = new URL(url).toString();

	return (
		<Card>
			<CardHeader className="flex-row justify-between items-center">
				<h4 className="font-medium text-lg">
					<Link
						className={buttonVariants({
							variant: "link",
							className:
								"text-zinc-300 text-xl flex flex-row items-end gap-x-2",
						})}
						target="_blank"
						rel="noreferrer"
						href={parsedUrl}
					>
						{parsedUrl}
						<SquareArrowOutUpRight className="w-4 h-4" />
					</Link>
				</h4>
				<CopyToClipboard text={parsedUrl} />
			</CardHeader>
		</Card>
	);
}
