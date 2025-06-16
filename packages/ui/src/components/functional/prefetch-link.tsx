"use client";

import type { ComponentProps } from "react";

import Link from "next/link";

export function PrefetchLink({
	children,
	...props
}: ComponentProps<typeof Link>) {
	const prefetch = () => {};

	return (
		<Link {...props} onMouseEnter={prefetch}>
			{children}
		</Link>
	);
}
