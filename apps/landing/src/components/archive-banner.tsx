"use client";

import { CircleAlert, X } from "lucide-react";
import { useEffect, useState } from "react";

const REPOSITORY_URL = "https://github.com/Jared-MB/kristall-legacy";
const STORAGE_KEY = "kristall-archive-banner-dismissed";

export default function ArchiveBanner() {
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		try {
			if (sessionStorage.getItem(STORAGE_KEY)) setVisible(false);
		} catch {}
	}, []);

	const dismiss = () => {
		setVisible(false);
		try {
			sessionStorage.setItem(STORAGE_KEY, "1");
		} catch {}
	};

	if (!visible) return null;

	return (
		<div
			role="status"
			className="relative flex items-center justify-center gap-3 border-b border-amber-500/20 bg-amber-950 py-3 pl-4 pr-12 text-sm text-amber-300"
		>
			<CircleAlert className="size-4 shrink-0" aria-hidden="true" />
			<p className="min-w-0 text-balance text-center">
				Kristall está fuera de línea y ahora solo existe como archivo. Ya puedes
				explorar el código en{" "}
				<a
					href={REPOSITORY_URL}
					target="_blank"
					rel="noopener noreferrer"
					className="font-semibold underline underline-offset-2 hover:text-amber-100 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
				>
					GitHub
				</a>
				.
			</p>
			<button
				type="button"
				onClick={dismiss}
				aria-label="Cerrar anuncio"
				className="absolute right-2 top-1/2 flex size-11 -translate-y-1/2 touch-manipulation items-center justify-center rounded-md text-amber-300 hover:text-amber-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300 md:right-4"
			>
				<X className="size-4" aria-hidden="true" />
			</button>
		</div>
	);
}
