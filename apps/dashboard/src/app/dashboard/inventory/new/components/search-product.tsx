"use client";

import { ChevronsUpDown } from "lucide-react";
import { use, useState } from "react";

import { Button } from "@kristall/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@kristall/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@kristall/ui/popover";
import { SearchProductContext } from "../context/search-product";
import { useNewInventoryStore } from "../store/useNewInventoryStore";

export function SearchProduct() {
	const [open, setOpen] = useState(false);

	const addProduct = useNewInventoryStore((state) => state.addProduct);

	const { products: items, setSearchParams } = use(SearchProductContext);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[200px] justify-between"
				>
					Seleccionar producto...
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput
						onValueChange={(e) => setSearchParams(e)}
						placeholder="Buscar producto..."
					/>
					<CommandList>
						<CommandEmpty>No se encontraron productos.</CommandEmpty>
						<CommandGroup>
							{items.map((item) => (
								<CommandItem
									key={item.value}
									value={item.value}
									onSelect={(currentValue) => {
										const [name, _id] = currentValue.split("/");
										addProduct({
											_id,
											name,
											stock: 1,
											locations: [],
										});
										setOpen(false);
									}}
								>
									{item.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
