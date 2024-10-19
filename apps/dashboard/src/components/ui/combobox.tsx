"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/core/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const WAIT_BETWEEN_TYPING = 400;

export function Combobox({
	items,
	entity,
	queryName = "search",
	setSelectedValue,
}: {
	items: { value: string; label: string; _id: string }[];
	entity?: string;
	queryName: string;
	setSelectedValue?: (value: string) => void;
}) {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");

	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const search = useDebouncedCallback((value: string) => {
		const query = new URLSearchParams(searchParams);
		query.set(queryName, value);
		if (!value) query.delete(queryName);
		replace(`${pathname}?${query.toString()}`);
	}, WAIT_BETWEEN_TYPING);

	const handleOpen = (value: boolean) => {
		setOpen(value);
	};

	return (
		<Popover open={open} onOpenChange={handleOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-full justify-between"
				>
					{value
						? items.find((item) => item.value === value)?.label
						: `Seleccionar ${entity ?? "item"}...`}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full p-0">
				<Command>
					<CommandInput
						onValueChange={search}
						placeholder={`Buscar ${entity ?? "item"}...`}
					/>
					<CommandEmpty>No se encontró ningún {entity ?? "item"}</CommandEmpty>
					<CommandList>
						<CommandGroup>
							{items.map((item) => (
								<CommandItem
									key={item.value}
									value={item.value}
									onSelect={(currentValue) => {
										setValue(currentValue === value ? "" : currentValue);
										setSelectedValue?.(currentValue);
										setOpen(false);
									}}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											value === item.value ? "opacity-100" : "opacity-0",
										)}
									/>
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
