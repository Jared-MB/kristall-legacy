import { getVirtualShowroom } from "@kristall/core/virtual-showroom/data";
import { CardDescription, CardTitle } from "@kristall/ui/card";
import { VirtualShowroomCustomize } from "./virtual-showroom-customize";
import { VirtualShowroomUrl } from "./virtual-showroom-url";

export async function VirtualShowroom() {
	const virtualShowroom = await getVirtualShowroom();

	if (!virtualShowroom || !virtualShowroom?.isPublic) {
		return null;
	}

	return (
		<>
			<VirtualShowroomUrl url={virtualShowroom.url} />
			<section className="flex flex-col gap-y-2">
				<CardTitle>Personaliza tu Virtual Showroom</CardTitle>
				<CardDescription>
					¡Haz que tu Virtual Showroom sea único! Personaliza el texto inicial y
					la imagen de portada!
				</CardDescription>
			</section>
			<VirtualShowroomCustomize virtualShowroom={virtualShowroom} />
		</>
	);
}
