import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@kristall/ui/card";
import { ComingSoon } from "@kristall/ui/coming-soon";

export function VirtualShowroomCustomize() {
	return (
		<Card className="opacity-50">
			<CardHeader>
				<CardTitle>Personaliza tu Virtual Showroom</CardTitle>
				<CardDescription>
					¡Haz que tu Virtual Showroom sea único! Personaliza el texto inicial y
					la imagen de portada!
				</CardDescription>
			</CardHeader>
			<ComingSoon className="text-base z-10 right-0" position="right" />
		</Card>
	);
}
