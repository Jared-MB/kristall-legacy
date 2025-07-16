import { SectionSubtitle, SectionTitle } from "@/components/ui/title";
import { format, parse } from "@formkit/tempo";
import { VERSIONS } from "@kristall/shared/versions";
import Link from "next/link";

export default function ChangeLogPage() {
	return (
		<main className="p-8 h-layout overflow-y-auto flex flex-col gap-y-4">
			<SectionTitle>Historial de versiones</SectionTitle>
			{VERSIONS.map((version) => (
				<section
					id={version._id}
					key={version._id}
					className="flex flex-col gap-y-2"
				>
					<header className="text-purple-500">
						<SectionTitle>
							{version._id} - {version.title}
						</SectionTitle>
					</header>
					<p className="text-zinc-300/80">{version.description}</p>
					{version.features && (
						<article>
							<SectionSubtitle>Novedades</SectionSubtitle>
							<ul className="text-zinc-300/80 pl-4">
								{version.features.map((feature) => (
									<li className="list-disc" key={feature}>
										{feature}
									</li>
								))}
							</ul>
						</article>
					)}
					{version.fixes && (
						<article>
							<SectionSubtitle>Correcciones</SectionSubtitle>
							<ul className="text-zinc-300/80 pl-4">
								{version.fixes.map((fix) => (
									<li className="list-disc" key={fix}>
										{fix}
									</li>
								))}
							</ul>
						</article>
					)}
					<hr />
					<footer className="flex flex-row items-center justify-between">
						<small>
							<time dateTime={version.date} className="capitalize">
								{format(parse(version.date, "YYYY-MM-DD"), "long")}
							</time>
						</small>
						{version._id.includes("RC-") || version._id.includes("beta") ? (
							<small className="text-zinc-300/60">
								Versión solo disponible con{" "}
								<Link
									href="/dashboard/settings/general/experimental"
									className="font-semibold hover:underline"
								>
									Experimental Features
								</Link>
							</small>
						) : null}
					</footer>
				</section>
			))}
		</main>
	);
}
