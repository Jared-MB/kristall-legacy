import type { Category } from "@kristall/core/interfaces/categories";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@kristall/ui/select";

interface Props {
	defaultValue?: string;
	disabled?: boolean;
	categories: Category[];
}

export function SelectCategory({ defaultValue, disabled, categories }: Props) {
	return (
		<Select name="category" defaultValue={defaultValue} disabled={disabled}>
			<SelectTrigger>
				<SelectValue placeholder="Selecciona una categoría" />
			</SelectTrigger>
			<SelectContent>
				{categories.map((category) => (
					<SelectItem key={category._id} value={category._id}>
						{category.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
