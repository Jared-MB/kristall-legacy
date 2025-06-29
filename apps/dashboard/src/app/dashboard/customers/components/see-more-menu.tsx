"use client";

import type { PrivateClient } from "@kristall/shared/domains/user-management/types";

import { useState } from "react";

import { Button } from "@kristall/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@kristall/ui/dropdown-menu";

import { MoreVertical } from "lucide-react";

import { DeleteClient } from "./delete-client";
import { EditClient } from "./edit-client";

export function SeeMoreMenu({ client }: { client: PrivateClient }) {
	const [open, setOpen] = useState(false);

	return (
		<DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
			<DropdownMenuTrigger asChild>
				<Button size="icon" variant="ghost">
					<MoreVertical />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Opciones</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<EditClient client={client} />
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<DeleteClient client={client} />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
