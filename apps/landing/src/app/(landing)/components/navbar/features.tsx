"use client";

import { Button } from "@nextui-org/button";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { useState } from "react";

import Link from "next/link";
import { AiOutlineShop } from "react-icons/ai";
import { CiBoxes, CiLocationOn } from "react-icons/ci";
import { PiNotepad, PiUsersThree } from "react-icons/pi";
import { VscChevronDown } from "react-icons/vsc";

export default function Features() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Popover
			isOpen={isOpen}
			onOpenChange={setIsOpen}
			classNames={{
				base: "border border-zinc-200 dark:border-zinc-700 rounded-md sticky",
			}}
		>
			<PopoverTrigger>
				<Button
					variant="light"
					onMouseEnter={() => setIsOpen(true)}
					className="text-base relative left-2 rounded-lg dark:text-zinc-300"
					endContent={
						<VscChevronDown
							className={`duration-300 ${isOpen ? "rotate-180" : ""}`}
						/>
					}
				>
					Soluciones
				</Button>
			</PopoverTrigger>
			<PopoverContent>
				<ul className="grid grid-cols-3 gap-2 p-2">
					<li>
						<Button
							className="flex flex-col w-full h-full p-3 items-start justify-center gap-1"
							variant="light"
							as={Link}
							href="/solutions/inventory"
							onClick={() => setIsOpen(false)}
						>
							<h4 className="text-base  font-semibold">
								<CiBoxes className="inline-block mr-2 w-6 h-6" />
								Administración de inventario
							</h4>
							<p className="text-[13px] text-zinc-600 dark:text-zinc-400">
								Gestiona tu inventario de manera eficiente.
							</p>
						</Button>
					</li>
					<li>
						<Button
							className="flex flex-col w-full h-full p-3 items-start justify-center gap-1"
							variant="light"
							as={Link}
							href="/solutions/orders"
							onClick={() => setIsOpen(false)}
						>
							<h4 className="text-base  font-semibold">
								<PiNotepad className="inline-block mr-2 w-6 h-6" />
								Gestor de pedidos
							</h4>
							<p className="text-[13px] text-zinc-600 dark:text-zinc-400">
								Ten todos tus pedidos en un solo lugar
							</p>
						</Button>
					</li>
					<li>
						<Button
							className="flex flex-col w-full h-full p-3 items-start justify-center gap-1"
							variant="light"
							as={Link}
							href="/solutions/pos"
							onClick={() => setIsOpen(false)}
						>
							<h4 className="text-base  font-semibold">
								<AiOutlineShop className="inline-block mr-2 w-6 h-6" />
								Punto de ventas
							</h4>
							<p className="text-[13px] text-zinc-600 dark:text-zinc-400">
								Vende desde cualquier lugar.
							</p>
						</Button>
					</li>
					<li>
						<Button
							className="flex flex-col w-full h-full p-3 items-start justify-center gap-1"
							variant="light"
							as={Link}
							href="/solutions/users"
							onClick={() => setIsOpen(false)}
						>
							<h4 className="text-base  font-semibold">
								<PiUsersThree className="inline-block mr-2 w-6 h-6" />
								Control de usuarios
							</h4>
							<p className="text-[13px] text-zinc-600 dark:text-zinc-400">
								Controla que puede hacer cada usuario.
							</p>
						</Button>
					</li>
					<li>
						<Button
							className="flex flex-col w-full h-full p-3 items-start justify-center gap-1"
							variant="light"
							as={Link}
							href="/solutions/locations"
							onClick={() => setIsOpen(false)}
						>
							<h4 className="text-base  font-semibold">
								<CiLocationOn className="inline-block mr-2 w-6 h-6" />
								Manejo de ubicaciones
							</h4>
							<p className="text-[13px] text-zinc-600 dark:text-zinc-400">
								Administra más de una ubicación.
							</p>
						</Button>
					</li>
					<li>
						<Button
							className="flex flex-col w-full h-full p-3 items-start justify-center gap-1"
							variant="light"
							as={Link}
							href="/solutions/customers"
							onClick={() => setIsOpen(false)}
						>
							<h4 className="text-base  font-semibold">
								<PiUsersThree className="inline-block mr-2 w-6 h-6" />
								Control de clientes
							</h4>
							<p className="text-[13px] text-zinc-600 dark:text-zinc-400">
								Lleva un registro de tus clientes.
							</p>
						</Button>
					</li>
				</ul>
			</PopoverContent>
		</Popover>
	);
}
