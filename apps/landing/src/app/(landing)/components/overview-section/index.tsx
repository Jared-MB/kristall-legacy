import WordRotate from "@/components/ui/word-rotate";
import { OrbitingServices } from "./orbiting-services";

export default function OverviewSection() {
	return (
		<section className="flex justify-evenly items-center flex-col md:flex-row overflow-x-hidden">
			<div className="flex flex-col gap-4 max-w-lg">
				<h2 className="text-4xl text-balance max-w-lg inline-block">
					Todo lo que necesitas
					<span className="flex items-center gap-x-2">
						desde
						<WordRotate
							words={["un solo lugar", "Kristall"]}
							className="font-semibold text-purple-500"
						/>
					</span>
				</h2>
				<p className="text-lg">
					Ten control sobre tu negocio desde donde estés.
				</p>
				<p className="text-lg">
					Simplifica tus operaciones, ahorra tiempo y enfócate en hacer crecer
					tu <strong className="text-purple-500">emprendimiento</strong> con una
					plataforma confiable y poderosa.
				</p>
			</div>
			<OrbitingServices />
		</section>
	);
}
