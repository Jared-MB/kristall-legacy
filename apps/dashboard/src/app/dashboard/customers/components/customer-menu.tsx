"use client";

import { Button } from "@/components/ui/button";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Customer } from "@/types/customer";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import EditCustomer from "./edit-customer";
import RemoveCustomer from "./remove-customer";

export default function CustomerMenu({ customer }: { customer: Customer }) {
	const [open, setOpen] = useState(false);

	const closeMenu = () => setOpen(false);

	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger asChild>
				<Button size="icon" variant="ghost">
					<MoreVertical />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Opciones</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<EditCustomer customer={customer} closeMenu={closeMenu} />
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<RemoveCustomer customer={customer} closeMenu={closeMenu} />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
