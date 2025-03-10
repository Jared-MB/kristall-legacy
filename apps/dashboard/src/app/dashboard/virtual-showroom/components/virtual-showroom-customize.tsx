import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@kristall/ui/card";
import { ScrollArea } from "@kristall/ui/scroll-area";
import { Preview } from "./customize/preview";

export function VirtualShowroomCustomize() {
	return (
		<ScrollArea className="px-6 h-full">
			<div className="flex flex-col gap-y-6 relative ">
				<Card>
					<CardHeader>
						<CardTitle>Personaliza tu Virtual Showroom</CardTitle>
						<CardDescription>
							¡Haz que tu Virtual Showroom sea único! Personaliza el texto
							inicial y la imagen de portada!
						</CardDescription>
					</CardHeader>
				</Card>
				<Preview />
			</div>
		</ScrollArea>
	);
}
