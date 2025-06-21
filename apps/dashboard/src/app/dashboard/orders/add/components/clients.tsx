"use client";

import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

import { getClientByName } from "@kristall/core/clients/all";

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

import { cn } from "@kristall/ui/utils/cn";
import { useDebouncedCallback } from "use-debounce";

export function Clients() {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");

	const [search, setSearch] = useState("");

	const debouncedSearch = useDebouncedCallback(setSearch, 500);

	const { data: clients } = useQuery({
		queryKey: [`clients:${search}`],
		queryFn: () => getClientByName(search),
	});

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-full justify-between"
				>
					{value
						? clients?.find((client) => client.name.includes(value))?.name
						: "Buscar cliente..."}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[420px] p-0">
				<Command>
					<CommandInput
						onValueChange={debouncedSearch}
						placeholder="Selecciona un cliente"
						className="h-9"
					/>
					<CommandList>
						<CommandEmpty>No hay clientes</CommandEmpty>
						<CommandGroup>
							{clients?.map((client) => (
								<CommandItem
									key={client._id}
									value={client.name}
									onSelect={(currentValue) => {
										setValue(currentValue === value ? "" : currentValue);
										setOpen(false);
									}}
								>
									{client.name}
									<Check
										className={cn(
											"ml-auto",
											value === client.name ? "opacity-100" : "opacity-0",
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
