import Authentication from "@/components/svg/authentication";
import { Shield } from "lucide-react";
import Link from "next/link";
import WelcomeMessage from "./components/welcome-message";

export default function LoginPage({
	children,
}: {
	children?: React.ReactNode;
}) {
	return (
		<div className="flex relative h-dvh">
			<Link href="" className="absolute text-5xl z-10 m-5 hidden lg:block">
				Kristall
			</Link>
			<section className="h-screen hidden lg:basis-1/2 lg:flex justify-center items-center bg-purple-500 opacity-70 rounded-r-xl">
				<Authentication className="w-[500px] h-[350px]" />
			</section>
			<section className="w-screen flex justify-center items-center lg:basis-1/2 h-dvh overflow-y-auto">
				<div className="w-full px-32 lg:w-auto lg:mx-auto flex gap-8 lg:gap-16 flex-col py-16 h-layout ">
					<header className="flex flex-col items-center lg:items-start w-full justify-center relative">
						<div className="flex flex-col lg:flex-row w-full items-center justify-center lg:justify-start">
							<Shield className="w-32 lg:w-16 h-32 fill-purple-500" />
							<div className="flex flex-col gap-3 lg:gap-0 items-start">
								<h1 className="text-3xl">
									<span className="text-purple-500  text-5xl">K</span>
									ristall <small className="text-sm">(beta)</small>
								</h1>
								<h2>Punto de ventas</h2>
							</div>
						</div>
						<div className="hidden lg:block text-4xl">
							<WelcomeMessage />
						</div>
					</header>
					{children}
					<div className="pb-14">
						<p className="max-w-[50ch] text-pretty text-center text-sm text-zinc-400">
							Versión beta: Puede presentar fallos y/o no todas las
							características estén implementadas correctamente.
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
