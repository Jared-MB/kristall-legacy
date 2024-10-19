export const SectionTitle = ({ children }: { children: React.ReactNode }) => {
	return <h3 className="text-2xl font-medium text-balance">{children}</h3>;
};

export const SectionSubtitle = ({
	children,
	id,
}: { children: React.ReactNode; id?: string }) => {
	return (
		<h4 className="text-lg font-medium text-balance" id={id}>
			{children}
		</h4>
	);
};
