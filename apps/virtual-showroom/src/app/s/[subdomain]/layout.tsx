import type { Metadata, ResolvingMetadata } from "next";

import {
	generateTonesFromRGB,
	hexToRGB,
	rgbToHex,
} from "@kristall/core/utils/colors";
import {
	getPublicVirtualShowroom,
	getVirtualShowroomImage,
} from "@kristall/core/virtual-showroom/public/get";
import { notFound } from "next/navigation";

interface MetadataProps {
	params: Promise<{ subdomain: string }>;
}

export async function generateMetadata(
	{ params }: MetadataProps,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const { subdomain } = await params;
	const image = await getVirtualShowroomImage(subdomain);

	const previousImages = (await parent).openGraph?.images || [];

	const parsedSubdomain =
		subdomain.replace("-", " ").slice(0, 1).toUpperCase() +
		subdomain.replace("-", " ").slice(1);

	return {
		title: parsedSubdomain,
		icons:
			image ??
			"https://cdn.kristall.app/dev/d1638a80-f3f2-4989-b062-242dc06316d3",
		openGraph: {
			images: [image, ...previousImages],
			title: parsedSubdomain,
		},
	};
}

export default async function SubdomainLayout({
	params,
	children,
}: { params: Promise<{ subdomain: string }>; children: React.ReactNode }) {
	const { subdomain } = await params;
	const shop = await getPublicVirtualShowroom(subdomain);

	if (!shop) {
		notFound();
	}

	const virtualShowroomConfig = shop?.virtualShowroomConfig;

	const tones = generateTonesFromRGB(
		hexToRGB(virtualShowroomConfig?.customColor ?? "#000000"),
	);

	const customStyle = {
		"--vs-custom-500": `${rgbToHex(tones["500"])}`,
		"--vs-custom-400": `${rgbToHex(tones["400"])}`,
		"--vs-custom-300": `${rgbToHex(tones["300"])}`,
		"--vs-custom-200": `${rgbToHex(tones["200"])}`,
		"--vs-custom-100": `${rgbToHex(tones["100"])}`,
	};

	// @ts-ignore: TYPESCRIPT DOESN'T KNOW ABOUT THE CUSTOM STYLE
	return <div style={{ ...customStyle }}>{children}</div>;
}
