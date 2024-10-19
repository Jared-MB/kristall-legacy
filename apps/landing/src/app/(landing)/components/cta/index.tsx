import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function CTA() {
	return (
		<section className="flex flex-col gap-y-1 w-fit">
			<p className="text-3xl ">
				¿Listo para impulsar tu{" "}
				<strong className="text-purple-500">emprendimiento</strong>?
			</p>
			<p className="text-2xl text-zinc-400">
				Lo que necesitas para tu negocio, lo encuentras en{" "}
				<strong className="text-purple-500">Kristall</strong>.
			</p>
			<Button className="text-medium w-fit mt-4" asChild>
				<Link href="/pricing" className="flex flex-row items-center gap-x-2">
					Comienza hoy <ArrowUpRight className="w-4 h-4" />
				</Link>
			</Button>
		</section>
	);
}
