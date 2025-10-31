"use client";

import { useMemo } from "react";
import { useConfig } from "../../config-context";
import { CardImage } from "../card-image";
import { usePreview } from "../preview-context";

import {
	generateTonesFromRGB,
	hexToRGB,
	rgbToHex,
} from "@kristall/core/utils/colors";

export function MainPage({ shopName }: { shopName: string }) {
	const config = useConfig();
	const { setHasStateChanged, previewColor } = usePreview();

	const handleChange = () => setHasStateChanged(true);

	const customStyleColors = useMemo(() => {
		const tones = generateTonesFromRGB(hexToRGB(previewColor));
		return {
			"--vs-custom-500": `${rgbToHex(tones["500"])}`,
			"--vs-custom-400": `${rgbToHex(tones["400"])}`,
			"--vs-custom-300": `${rgbToHex(tones["300"])}`,
			"--vs-custom-200": `${rgbToHex(tones["200"])}`,
			"--vs-custom-100": `${rgbToHex(tones["100"])}`,
		};
	}, [previewColor]);

	return (
		<div
			/** @ts-ignore TYPESCRIPT DOESN'T RECOGNIZE THE CSS VARIABLES AS VALID STYLE PROPERTIES */
			style={{ ...customStyleColors }}
			className="flex flex-col bg-white text-black rounded-md @container"
		>
			<input type="hidden" name="page" value="index" />
			<header className="h-20 p-6 flex items-center justify-between">
				<h1 className="text-4xl font-serif">{shopName}</h1>
			</header>
			<div className="grid grid-cols-3 grid-rows-7 gap-4 px-6 py-0 self-center w-full h-[calc(100dvh-6rem)]">
				<CardImage
					url={config?.cardImageOne?.url}
					name="cardImageOne"
					className="bg-(--vs-custom-400) col-span-3 @2xl:col-span-2 row-span-4 @2xl:row-span-7 rounded-lg p-6 flex justify-end flex-col bg-cover bg-center"
				>
					<h3 className="text-lg text-(--vs-custom-400)">
						<textarea
							onChange={handleChange}
							name="cardTitle"
							defaultValue={config?.cardTitle ?? "Lorem, ipsum."}
							className="bg-transparent resize-none field-sizing max-w-[25ch] border border-black border-opacity-10 rounded p-0.5"
						/>
					</h3>
					<h4 className="font-bold text-3xl text-white text-balance max-w-[32ch]">
						<textarea
							onChange={handleChange}
							name="cardDescription"
							defaultValue={
								config?.cardDescription ??
								"Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, ut?"
							}
							className="bg-transparent resize-none field-sizing max-w-[20ch] border border-black border-opacity-10 rounded p-0.5"
						/>
					</h4>
				</CardImage>
				<div className="cursor-pointer group row-span-2 @md:row-span-3 @2xl:row-span-4 col-span-3 @md:col-span-2 @2xl:col-start-3 bg-(--vs-custom-300) rounded-lg flex items-center justify-center">
					<h3 className="@4xl:text-4xl @md:text-3xl text-2xl font-serif flex flex-col group-hover:underline">
						<span>Ver</span>
						<div className="flex items-center gap-6 @2xl:flex-col @2xl:gap-0 @2xl:items-start">
							<span>Productos</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="1"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="lucide lucide-chevrons-right w-6 @md:w-8 @2xl:w-16 h-6 @md:h-8 @2xl:h-16"
							>
								<title>Chevron Right</title>
								<path d="m6 17 5-5-5-5" />
								<path d="m13 17 5-5-5-5" />
							</svg>
						</div>
					</h3>
				</div>
				<CardImage
					url={config?.cardImageTwo?.url}
					name="cardImageTwo"
					className="bg-(--vs-custom-200) @md:row-span-3 @2xl:row-start-5 col-span-3 @md:col-span-1 @2xl:col-span-2 @2xl:col-start-3 bg-cover bg-center rounded-lg"
				/>
			</div>
			<div className="grid grid-cols-9 grid-rows-3 @2xl:grid-rows-1 gap-4 px-6 pt-4 w-full font-serif h-72 @2xl:h-48">
				<CardImage
					url={config?.cardImageThree?.url}
					name="cardImageThree"
					className="bg-(--vs-custom-400) col-span-3 @2xl:col-span-3 col-start-1 row-span-2 @2xl:row-span-1 rounded-lg bg-center bg-cover"
				/>
				<div className="cursor-pointer col-span-6 @2xl:col-span-4 col-start-4 row-span-2 @2xl:row-span-1 hover:underline overflow-hidden rounded-lg p-6 grid place-content-center bg-(--vs-custom-100)">
					<span className="relative z-20 @md:text-3xl text-xl">Categorías</span>
				</div>
				<CardImage
					url={config?.cardImageFour?.url}
					name="cardImageFour"
					className="bg-(--vs-custom-300) @2xl:col-start-8 col-span-9 @2xl:col-span-2  bg-cover bg-center rounded-lg"
				/>
			</div>
			<footer className="p-6">
				<small className="text-sm">
					Powered by{" "}
					<a
						className="text-(--vs-custom-500)"
						href="https://kristall.app"
						target="_blank"
						rel="noopener noreferrer"
					>
						Kristall
					</a>
				</small>
			</footer>
		</div>
	);
}
