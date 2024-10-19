import Step from "./step";

export default function Steps() {
	return (
		<section className="flex flex-col md:grid lg:grid xl:grid grid-cols-3 gap-10 lg:pt-8 pb-16">
			<Step index={1} title="Regístrate">
				Regístrate en Kristall y crea tu cuenta.
			</Step>
			<Step index={2} title="Agrega tu inventario">
				Una vez registrado, puedes empezar a agregar tus productos.
			</Step>
			<Step index={3} title="Vende">
				Empieza a vender y a registrar tus ventas.
			</Step>
		</section>
	);
}
