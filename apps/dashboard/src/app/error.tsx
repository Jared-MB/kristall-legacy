"use client";

import Svg from "@/components/svg";
import { Bug } from "@/components/svg/bug";
import { Button } from "@/components/ui";
import Link from "next/link";

export default function AppError() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center">
			<div className="container flex flex-col items-center justify-center px-5 text-center">
				<Svg className="w-[35dvw]">
					<Bug />
				</Svg>
				<p className="mt-4 text-xl sm:text-2xl">
					Oops! Parece que algo salió mal
				</p>
				<p className="mt-4 max-w-xs sm:max-w-lg text-gray-400">
					Lo sentimos, intente de nuevo más tarde o contacta con nosotros.
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
