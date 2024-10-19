export default function SectionContainer({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div className="md:px-24">{children}</div>;
}
