import AnimatedShinyText from "@/components/ui/animated-shiny-text";
import { diffDays } from "@formkit/tempo";
import { VERSIONS } from "@kristall/shared/versions";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { InfoCard } from "./info-card";

export function VersionCard() {
	const daysAfterNewVersion = diffDays(new Date(), VERSIONS[0].date);

	if (daysAfterNewVersion > 7) {
		return null;
	}

	return (
		<InfoCard title="Nueva versión" icon={<Sparkles />} isNewVersion>
			<div className="flex flex-col 2xl:flex-row justify-between items-start h-full">
				<span className="text-base text-zinc-300/90">{VERSIONS[0]._id}</span>
				<AnimatedShinyText className="mx-0">
					<Link
						className="text-xs hover:underline hover:text-purple-500"
						href={`/docs/change-log#${VERSIONS[0]._id}`}
					>
						¿Qué hay de nuevo?
					</Link>
				</AnimatedShinyText>
			</div>
		</InfoCard>
	);
}
