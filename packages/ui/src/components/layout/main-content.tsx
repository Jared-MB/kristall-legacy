interface Props {
	children: React.ReactNode;
}

export function MainContent({ children }: Props) {
	return <main className="p-8 h-layout overflow-y-auto">{children}</main>;
}
