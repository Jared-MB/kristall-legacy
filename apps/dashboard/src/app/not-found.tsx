import Svg from "@/components/svg";
import NotFound404 from "@/components/svg/not-found-404";
import { Button } from "@/components/ui";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center">
			<div className="container flex flex-col items-center justify-center px-5 text-center">
				<Svg className="w-[35dvw]">
					<NotFound404 />
				</Svg>
				{/* <ShieldAlert className="h-24 w-24 text-purple-500 mb-8" /> */}
				<h1 className="text-5xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none bg-clip-text text-transparent bg-linear-to-r from-purple-500 to-purple-300">
					404
				</h1>
				<p className="mt-4 text-xl sm:text-2xl">Oops! Página no encontrada</p>
				<p className="mt-4 max-w-xs sm:max-w-lg text-gray-400">
					Lo sentimos, la página que estás buscando no existe o ha sido movida.
				</p>
				<div className="mt-8">
					<Button asChild className="bg-purple-500 hover:bg-purple-600 ">
						<Link href="/dashboard">Volver al inicio</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
