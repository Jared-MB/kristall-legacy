import { SearchSelect } from "@kristall/ui/functional/search-select";
import { Label } from "@kristall/ui/label";
import {
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@kristall/ui/select";

export function ClientStatusFilter() {
	return (
		<div className="flex items-center gap-2">
			<Label>Estatus:</Label>
			<SearchSelect name="status">
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Selecciona un estado" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="active">Activos</SelectItem>
					<SelectItem value="inactive">Inactivos</SelectItem>
				</SelectContent>
			</SearchSelect>
		</div>
	);
}
