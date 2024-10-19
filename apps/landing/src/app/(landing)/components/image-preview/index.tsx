import Image from "next/image";

export default function ImagePreview() {
	return (
		<section className="p-1 relative flex items-center justify-center">
			<div className="ring ring-zinc-700/20 rounded-lg relative aspect-[9/16] md:aspect-video h-[630px]">
				<Image
					fill
					quality={100}
					src="/landing_page/dashboard.png"
					alt="Kristall"
					priority
					className="w-full h-full object-contain hidden lg:block p-4"
				/>
				<Image
					fill
					quality={100}
					src="/landing_page/dashboard_mobile.png"
					alt="Kristall"
					className="w-full h-full object-contain lg:hidden rounded-md p-2"
				/>
			</div>
			<div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-900 to-90% z-10" />
		</section>
	);
}
