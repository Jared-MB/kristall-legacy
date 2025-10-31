import { SectionSubtitle, SectionTitle } from "@/components/ui/title";
import Image from "next/image";
import Link from "next/link";

export default function FAQPage() {
	return (
		<main className="p-8 h-layout overflow-y-auto">
			<SectionTitle>Preguntas frecuentes</SectionTitle>
			<section className="flex flex-col gap-y-4 p-4">
				<SectionSubtitle id="image-size-limit">
					¿Por qué no puedo subir imágenes de más de 500kb?
				</SectionSubtitle>
				<p>
					Para garantizar la velocidad de carga de las imágenes en la
					aplicación, hemos establecido un límite de 500kb por imagen, un tamaño
					que consideramos suficiente para la mayoría de los casos conservando
					una buena calidad de imagen.
				</p>
				<p>
					Imágenes más pesadas pueden ralentizar la carga de las mismas o
					aumentar el consumo de datos, tanto para usted en su dashboard como
					para los visitantes de su Virtual Showroom.
				</p>
				<p>
					Si tus imágenes son pesadas, te recomendamos que las redimensiones o
					las comprimas antes de subirlas. Nosotros recomendamos el uso de
					herramientas como{" "}
					<Link
						href="https://squoosh.app/"
						target="_blank"
						className="hover:underline text-purple-500"
					>
						Squoosh
					</Link>
					, una herramienta gratuita y online que te permite reducir el peso de
					tus imágenes con una pérdida mínima de calidad.
				</p>
				<Image
					src="https://cdn.kristall.app/squoosh-example.webp"
					alt="Squoosh usage example"
					width={930}
					height={487}
					className="w-2/3 mx-auto aspect-930/487"
				/>
				<p>
					El formato de imagen que elijas también influye en el peso de la
					misma. Por ejemplo, las imágenes en formato{" "}
					<span className="italic font-medium">WebP</span> suelen ser más
					ligeras que las imágenes en formato{" "}
					<span className="italic font-medium">PNG</span> o{" "}
					<span className="italic font-medium">JPEG</span>, por lo que te
					recomendamos que utilices este formato siempre que sea posible.
				</p>
				<Image
					className="aspect-407/558 w-56 mx-auto"
					src="https://cdn.kristall.app/webp-format-squoosh.webp"
					alt="WebP format example"
					width={407}
					height={558}
				/>
			</section>
			<section className="flex flex-col gap-y-4 p-4">
				<SectionSubtitle id="profile-image-not-updating">
					¿Por qué mi imagen de perfil no se actualiza?
				</SectionSubtitle>
				<p>
					Si has actualizado tu imagen de perfil y no ves los cambios
					inmediatamente, no te preocupes, es posible que la imagen que tu
					navegador este tomando sea la versión en caché de la imagen anterior.
				</p>
				<p>
					Debido a que la imagen de perfil se actualiza con poca frecuencia,
					hemos decidido implementar un sistema de caché para incrementar la
					velocidad de carga y evitar la descarga de recursos innecesarios. Esto
					significa que tu navegador puede estar mostrando la versión en caché
					de tu imagen de perfil anterior en lugar de la nueva imagen que acabas
					de subir.
				</p>
				<p>
					Para solucionar este problema, puedes forzar la recarga de la página
					pulsando <kbd>Ctrl + F5</kbd> en Windows o <kbd>Cmd + Shift + R</kbd>{" "}
					en macOS. Esto hará que tu navegador descargue la última versión de
					todos los archivos de la página, incluyendo tu imagen de perfil.
				</p>
				<p>
					Si después de recargar la página sigues sin ver los cambios,
					tranquilo, es posible que la imagen se haya subido correctamente pero
					que el servidor tarde unos minutos en procesarla, actualizarla y
					replicarla en todos los servidores de la red. En este caso, te
					recomendamos que esperes unos minutos y vuelvas a intentarlo más
					tarde.
				</p>
			</section>
		</main>
	);
}
