interface Props {
	name: string;
	details?: string[];
	subtotal: number;
	price: number;
	quantity: number;
}

export default function Product({
	name,
	details,
	subtotal,
	quantity,
	price,
}: Props) {
	return (
		<div className="grid grid-cols-[1fr_auto] items-center gap-4">
			<div>
				<h4 className="font-medium">{name}</h4>
				<p className="text-muted-foreground text-sm">x{quantity}</p>
			</div>
			<div className="text-right">
				<p className="text-muted-foreground text-sm">${price}</p>
				<p className="font-medium">${subtotal}</p>
			</div>
		</div>
	);
}
