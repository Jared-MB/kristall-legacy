import Link from "next/link";
import BuildingWebsite from "../svg/building-website";
import { Button } from "../ui";
import { Progress } from "../ui/progress";

export default function UnderConstruction({
	value = 66,
	link,
	target = "_self",
}: {
	value?: number;
	link?: string;
	target?: string;
}) {
	return (
		<main className="flex flex-col -mt-12 items-center justify-center gap-6">
			<section className="space-y-2 text-center">
				<div className="flex items-center justify-center">
					<BuildingWebsite />
				</div>
				<h1 className="text-3xl font-bold text-balance">
					Sitio en construcción
				</h1>
				<p className="text-gray-500 dark:text-gray-400 text-pretty max-w-lg">
					Actualmente estamos actualizando nuestro sitio para brindarte una
					experiencia aún mejor. ¡Vuelve pronto!
				</p>
				{link && (
					<article className="flex flex-col text-gray-300 pt-1">
						<span>Puedes ver nuestro progreso aquí:</span>
						<Button asChild variant="link">
							<Link href={link} target={target}>
								{link}
							</Link>
						</Button>
					</article>
				)}
			</section>
			<Progress className="w-full max-w-md" value={value} />
		</main>
	);
}
