"use client";

import { Button } from "@kristall/ui/button";
import { CardBody } from "@kristall/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@kristall/ui/table";
import { MoreVertical } from "lucide-react";
import { useNewInventoryStore } from "../store/useNewInventoryStore";

export default function Products() {
	const products = useNewInventoryStore((state) => state.products);

	return (
		<CardBody>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Nombre</TableHead>
						<TableHead>Stock</TableHead>
						<TableHead />
					</TableRow>
				</TableHeader>
				<TableBody>
					{Array.from(products.values()).map((product) => (
						<TableRow key={product._id}>
							<TableCell>{product.name}</TableCell>
							<TableCell>{product.stock}</TableCell>
							<TableCell>
								<Button size="icon" variant="ghost">
									<MoreVertical />
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</CardBody>
	);
}
