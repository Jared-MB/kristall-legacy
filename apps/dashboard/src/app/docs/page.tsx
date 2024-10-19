import Divider from "@/components/divider";
import { SectionTitle } from "@/components/ui/title";

export default function DocsPage() {
	return (
		<main className="p-8 h-layout overflow-y-auto flex flex-col gap-y-4">
			<section className="flex flex-col gap-y-4">
				<h2 className="text-4xl font-medium text-balance">
					Acerca de Kristall{" "}
				</h2>
				<p>
					Kristall es un servicio diseñado para ayudar a los emprendedores a
					llevar un{" "}
					<span className="font-medium text-purple-500">
						control centralizado
					</span>{" "}
					de sus productos, ventas, clientes y órdenes. Proporcionamos una
					plataforma intuitiva y fácil de usar que permite a los{" "}
					<span className="text-purple-500 font-medium">emprendedores</span> y
					pequeñas empresas administrar sus operaciones de manera eficiente y
					efectiva.
				</p>
			</section>
			<section className="flex flex-col gap-y-2">
				<SectionTitle>Misión</SectionTitle>
				<p>
					En Kristall, nuestra misión es facilitar la administración de los
					emprendedores y pequeñas empresas a través de una plataforma intuitiva
					y fácil de usar. Priorizamos la experiencia del usuario y la calidad
					del servicio, para que nuestros usuarios puedan enfocarse en lo que
					realmente importa:{" "}
					<span className="text-purple-500 font-medium">
						hacer crecer su negocio.
					</span>
				</p>
			</section>
			<section className="flex flex-col gap-y-2">
				<SectionTitle>Visión</SectionTitle>
				<p>
					Nuestra visión es ser el servicio preferido por los emprendedores y
					pequeñas empresas para llevar un control centralizado en su
					administración. Aspiramos a ser reconocidos por la{" "}
					<span className="text-purple-500 font-medium">calidad</span> de
					nuestro servicio y la{" "}
					<span className="text-purple-500 font-medium">satisfacción</span> de
					nuestros usuarios, estableciendo un estándar de excelencia en la
					gestión de inventario y pedidos.
				</p>
			</section>
			<section className="flex flex-col gap-y-2">
				<SectionTitle>Valores</SectionTitle>
				<ul className="flex flex-col gap-y-1 list-disc pl-4">
					<li>
						<span className="font-semibold">Transparencia:</span> Nos
						comprometemos a ser{" "}
						<span className="text-purple-500 font-medium">transparentes</span>{" "}
						en nuestras acciones y decisiones con nuestros usuarios y nuestro
						equipo.
					</li>
					<li>
						<span className="font-semibold">Responsabilidad:</span> Somos{" "}
						<span className="text-purple-500 font-medium">responsables</span> de
						nuestras acciones y decisiones, buscando siempre el beneficio común.
					</li>
					<li>
						<span className="font-semibold">Calidad:</span> Nos esforzamos por
						ofrecer un servicio de calidad,{" "}
						<span className="text-purple-500 font-medium">
							superando las expectativas
						</span>{" "}
						de nuestros usuarios.
					</li>
					<li>
						<span className="font-semibold">Innovación:</span> Buscamos
						constantemente nuevas formas de{" "}
						<span className="text-purple-500 font-medium">mejorar</span> nuestro
						servicio y la experiencia de nuestros usuarios.
					</li>
				</ul>
			</section>
			<Divider />
			<section className="flex flex-col gap-y-2">
				<p>
					Kristall está diseñado pensando en las necesidades de los
					emprendedores modernos, ofreciendo herramientas que simplifican la
					gestión y permiten un crecimiento sostenido y organizado. Nuestro
					equipo está comprometido con la excelencia y la satisfacción del
					cliente, trabajando constantemente para mejorar y adaptar nuestra
					plataforma a las necesidades cambiantes del mercado.
				</p>
			</section>
		</main>
	);
}
