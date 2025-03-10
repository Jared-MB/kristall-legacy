import CopyToClipboard from "@/components/ui/copy-to-clipboard";
import { Button } from "@kristall/ui/button";
import {
	Card,
	CardBody,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@kristall/ui/card";
import { Input } from "@kristall/ui/input";
import { Skeleton } from "@kristall/ui/skeleton";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export function VirtualShowroomUrl({ url }: { url: string }) {
	const parsedUrl = new URL(url).toString();

	return (
		<Card>
			<CardHeader>
				<CardTitle>URL de tu Virtual Showroom</CardTitle>
				<CardDescription>
					Comparte este enlace para que tus clientes puedan visitar tu tienda
					virtual.
				</CardDescription>
			</CardHeader>
			<CardBody className="pt-0">
				<div className="flex items-center space-x-2">
					<Input
						value={parsedUrl}
						readOnly
						className="font-mono text-sm"
						endContent={<CopyToClipboard text={parsedUrl} variant="ghost" />}
					/>
					<Button variant="outline" size="icon" asChild>
						<Link href={parsedUrl} target="_blank" rel="noreferrer">
							<ExternalLink className="h-4 w-4" />
						</Link>
					</Button>
				</div>
				<CardDescription className="border text-xs p-3 rounded-md">
					<strong className="text-purple-500">¡Buenas noticias!</strong> Tu
					Virtual Showroom se ha registrado con éxito, pero puede tardar un poco
					en que los cambios se propaguen completamente.
				</CardDescription>
			</CardBody>
		</Card>
	);
}

export function VirtualShowroomUrlSkeleton() {
	return (
		<Card>
			<CardHeader className="flex-row justify-between items-center">
				<h4 className="font-medium text-lg">
					<span className="text-zinc-300 text-xl flex flex-row items-end gap-x-2">
						<Skeleton className="w-72 h-5" />
					</span>
				</h4>
				<CopyToClipboard disabled text="https://kristall.app" />
			</CardHeader>
		</Card>
	);
}
