export default function ComingSoon({
	children = "¡Próximamente!",
}: {
	children?: React.ReactNode | string;
}) {
	return (
		<small className="absolute skew-y-6 -left-1 -bottom-1 text-purple-400 text-[10px] animate-pulse">
			{children}
		</small>
	);
}
