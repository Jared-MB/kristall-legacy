import { Card } from "@/components/ui/card";
import RetroGrid from "@/components/ui/retro-grid";
import Diagram from "./diagram";
import Services from "./services";

export default function Bento() {
	return (
		<section>
			<Services />
			<Card className="relative overflow-hidden flex flex-col my-2 gap-y-8 items-center justify-center w-full lg:p-8 !pt-14 dark:inner-shadow">
				<RetroGrid />
				<p className="max-w-2xl text-pretty text-center text-2xl">
					<strong className="text-purple-500">
						Actualiza una vez, gestiona en todas partes.
					</strong>{" "}
					Actualiza tus productos en varias ubicaciones en pocos pasos.
				</p>
				<Diagram />
			</Card>
		</section>
	);
}
