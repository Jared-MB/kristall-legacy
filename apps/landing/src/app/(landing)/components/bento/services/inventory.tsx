import KFigure from "@/components/k-figure";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { PRODUCTS_EXAMPLE } from "@/constants/objects";
import { MoreVertical, Search } from "lucide-react";

export default function Inventory() {
	return (
		<Card className="mt-0 absolute -right-10 top-10 origin-top transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] scale-90 group-hover:scale-105">
			<CardBody>
				<div className="flex flex-row gap-x-4">
					<Input
						placeholder="Buscar..."
						icon={<Search className="w-4 h-4" />}
					/>
					<Select>
						<SelectTrigger>
							<SelectValue placeholder="Ubicación" />
						</SelectTrigger>
						<SelectContent className="!bg-zinc-950/70">
							<SelectItem value="1">Almacén</SelectItem>
							<SelectItem value="2">Tienda 1</SelectItem>
							<SelectItem value="3">Tienda 3</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead />
							<TableHead>Producto</TableHead>
							<TableHead>Precio</TableHead>
							<TableHead>Stock</TableHead>
							<TableHead />
						</TableRow>
					</TableHeader>
					<TableBody>
						{PRODUCTS_EXAMPLE.slice(0, 2).map((product) => (
							<TableRow key={product._id}>
								<TableCell>
									<KFigure />
								</TableCell>
								<TableCell>{product.name}</TableCell>
								<TableCell>{product.price}</TableCell>
								<TableCell>{product.stock}</TableCell>
								<TableCell>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button size="icon" variant="ghost">
												<MoreVertical />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent className="opacity-60">
											<DropdownMenuLabel>Opciones</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<DropdownMenuItem>Editar</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardBody>
		</Card>
	);
}
