import { Button } from "@kristall/ui/button";
import { Card, CardBody } from "@kristall/ui/card";

import { ArrowRight, Sparkles, Zap } from "lucide-react";

export function UpgradeSubscription() {
	return (
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
							<small className="absolute -bottom-3 -right-10 bg-zinc-900 rounded-md border border-zinc-700 px-2 py-0.5 flex items-center gap-x-2">
								<Sparkles className="w-3 h-3" /> Disponible pronto
							</small>
						</Button>
					</div>
					<div className="hidden sm:flex h-24 w-24 items-center justify-center rounded-full bg-purple-500/10">
						<Zap className="h-12 w-12 text-purple-400" />
					</div>
				</div>
			</CardBody>
		</Card>
	);
}
