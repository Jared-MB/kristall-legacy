import { Button } from "@kristall/ui/button";
import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@kristall/ui/card";

import { ArrowRight, CheckCircle2, Package, Zap } from "lucide-react";
import Setting from "../components/setting";

export default function SubscriptionPage() {
	return (
		<Setting>
			<Card id="subscription">
				<CardHeader className="pb-0">
					<CardTitle className="text-3xl font-medium text-zinc-100">
						Tienda
					</CardTitle>
				</CardHeader>
				<CardBody>
					<div className="space-y-4">
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<Package className="h-5 w-5 text-zinc-400" />
								<span className="text-sm font-medium text-zinc-400">
									Paquete
								</span>
							</div>
							<div className="flex items-center gap-2">
								<span className="text-2xl font-semibold text-zinc-100">
									Plus
								</span>
								<div className="rounded-full bg-purple-500/10 px-2 py-0.5 text-xs font-medium text-purple-500">
									Activo
								</div>
							</div>
						</div>
						<div className="space-y-1">
							<div className="text-sm text-zinc-400">Próximo pago</div>
							<div className="flex items-center gap-2">
								<CheckCircle2 className="h-4 w-4 text-purple-500" />
								<span className="text-sm font-medium text-zinc-100">
									Viernes, Abril 26, 2024
								</span>
							</div>
						</div>
					</div>
				</CardBody>
			</Card>
			<Card className=" border-zinc-800 relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent" />
				<CardBody className="pt-6">
					<div className="flex items-center justify-between relative">
						<div className="space-y-3">
							<div className="flex items-center gap-2">
								<Zap className="h-5 w-5 text-purple-400" />
								<span className="text-sm font-medium text-purple-400">
									Mejora tu plan
								</span>
							</div>
							<h3 className="text-xl font-semibold text-zinc-100">
								Desbloquea todas las funciones
							</h3>
							<p className="text-sm text-zinc-400 max-w-[280px]">
								Obtén acceso a características premium y mejora tu experiencia
							</p>
							<Button
								className="bg-purple-500 hover:bg-purple-600 text-white mt-2 relative"
								disabled
							>
								Ver planes premium
								<ArrowRight className="h-4 w-4 ml-2" />
								<small className="absolute -bottom-3 -right-10 bg-zinc-900 rounded-md border border-zinc-700 px-2 py-0.5">
									Disponible pronto
								</small>
							</Button>
						</div>
						<div className="hidden sm:flex h-24 w-24 items-center justify-center rounded-full bg-purple-500/10">
							<Zap className="h-12 w-12 text-purple-400" />
						</div>
					</div>
				</CardBody>
			</Card>
			<Card variant="destructive" id="cancel-subscription">
				<CardHeader>
					<CardTitle>Cancelar suscripción</CardTitle>
				</CardHeader>
				<CardBody className="pt-0">
					<p className="md:w-[100ch] text-pretty">
						Si cancelas tu suscripción, una vez acabado el periodo de
						facturación, no podrás acceder a tu tienda y se deshabilitara el
						Virtual Showroom. Podrás reactivarla en cualquier momento.{" "}
						<small className="text-zinc-300/60">
							(Tus datos y productos se borrarán pasados 3 meses de inactividad)
						</small>
					</p>
					<p>Para cancelar tu suscripción, haz clic en el botón de abajo.</p>
				</CardBody>
				<CardFooter className="justify-end">
					<Button variant="destructive">Cancelar suscripción</Button>
				</CardFooter>
			</Card>
		</Setting>
	);
}
