"use client";

import Svg from "@/components/svg";
import { Bug } from "@/components/svg/bug";
import { Button } from "@kristall/ui/button";
import Link from "next/link";

export default function AppError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
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
				<div className="mt-8 flex items-center gap-x-4">
					<Button asChild variant="outline">
						<Link href="/dashboard">Volver al inicio</Link>
					</Button>
					<Button onClick={reset}>Intentar de nuevo</Button>
				</div>
			</div>
		</div>
	);
}
