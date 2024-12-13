"use client";

import { printInventory } from "@/actions/product.actions";
import {
	Button,
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	InputContainer,
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	dropdownMenuTriggerClass,
} from "@/components/ui";
import type { Product } from "@kristall/core/interfaces/products";
import { useSearchParams } from "next/navigation";
import { forwardRef, useMemo, useRef, useState, useTransition } from "react";
import { useReactToPrint } from "react-to-print";
import { useLocationsContext } from "../../../context/location-context";
import PrintLocationPage from "./print-location-page";

const PrintLocations = forwardRef(() => {
	const locations = useLocationsContext();

	const searchParams = useSearchParams();

	const [openDialog, setOpenDialog] = useState(false);
	const [location, setLocation] = useState(
		searchParams.get("location") ?? locations[0]._id,
	);

	const locationName = useMemo(() => {
		const locationFound = locations.find((loc) => loc._id === location);
		return locationFound?.name ?? "";
	}, [location]);

	const [products, setProducts] = useState<
		Pick<Product, "_id" | "name" | "stock" | "price">[] | null
	>(null);

	const ref = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);

	const print = useReactToPrint({
		contentRef: ref,
		documentTitle: `Inventario ${new Date().toLocaleDateString()}`,
		pageStyle: `
            * {
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
				background-color: #fff;
				padding:0;
				margin:0;
			}
        `,
	});

	const [isPending, startTransition] = useTransition();

	function handlePrint() {
		startTransition(async () => {
			const products = await printInventory(location);
			setProducts(products);
			setTimeout(() => print(), 1);
		});
	}

	return (
		<>
			<Dialog open={openDialog} onOpenChange={setOpenDialog}>
				<DialogTrigger className={dropdownMenuTriggerClass}>
					Imprimir
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Imprimir ubicaciones</DialogTitle>
					</DialogHeader>
					<div className="flex flex-col gap-y-4">
						<InputContainer>
							<Label>Ubicación</Label>
							<Select defaultValue={location} onValueChange={setLocation}>
								<SelectTrigger>
									<SelectValue placeholder="Ubicación" />
								</SelectTrigger>
								<SelectContent>
									{locations.map((location) => (
										<SelectItem key={location._id} value={location._id}>
											{location.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</InputContainer>
						<DialogFooter>
							<Button
								type="button"
								variant="outline"
								onClick={() => setOpenDialog(false)}
							>
								Cancelar
							</Button>
							<Button type="button" disabled={isPending} onClick={handlePrint}>
								{isPending ? "Obteniendo datos..." : "Imprimir"}
							</Button>
						</DialogFooter>
					</div>
				</DialogContent>
			</Dialog>
			<PrintLocationPage
				ref={ref}
				products={products ?? ([] as any)}
				locationName={locationName}
			/>
		</>
	);
});

export default PrintLocations;
