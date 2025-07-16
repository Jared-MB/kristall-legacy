import { isFeatureEnabled } from "@kristall/client/utils/version";
import { getVirtualShowroom } from "@kristall/core/virtual-showroom/data";
import { CardDescription, CardTitle } from "@kristall/ui/card";
import { AVAILABLE_SINCE, AVAILABLE_SINCE_MINOR } from "../page";
import {
	VirtualShowroomUrl,
	VirtualShowroomUrlSkeleton,
} from "./virtual-showroom-url";

export async function VirtualShowroom() {
	const virtualShowroom = await getVirtualShowroom();

	if (!virtualShowroom || !virtualShowroom?.isPublic) {
		return null;
	}

	const isEnabled = await isFeatureEnabled(
		AVAILABLE_SINCE,
		AVAILABLE_SINCE_MINOR,
	);

	if (!isEnabled) {
		return null;
	}

	return (
		<>
			<VirtualShowroomUrl url={virtualShowroom.url} />
			<section className="flex flex-col gap-y-2">
				<CardTitle>¿Quieres una página a tu medida?</CardTitle>
				<CardDescription>
					Envíanos un correo a{" "}
					<a
						className="hover:underline text-purple-500"
						href="mailto:kristall.dev.pos@gmail.com"
					>
						kristall.dev.pos@gmail.com
					</a>{" "}
					para que podamos ayudarte a crear el Virtual Showroom ideal para tu
					negocio.
				</CardDescription>
			</section>
		</>
	);
}

export function VirtualShowroomSkeleton() {
	return (
		<>
			<VirtualShowroomUrlSkeleton />
			<section className="flex flex-col gap-y-2">
				<CardTitle>Personaliza tu Virtual Showroom</CardTitle>
				<CardDescription>
					¡Haz que tu Virtual Showroom sea único! Personaliza el texto inicial y
					la imagen de portada!
				</CardDescription>
			</section>
		</>
	);
}
