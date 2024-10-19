import { Button } from "@/components/ui";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import DeleteLocation from "./delete-location";
import EditLocation from "./edit-location";

export default function LocationOptions() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<MoreVertical />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Opciones</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<EditLocation />
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<DeleteLocation />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
