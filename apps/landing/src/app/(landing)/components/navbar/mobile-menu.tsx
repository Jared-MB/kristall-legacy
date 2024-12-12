"use client";

import { Button } from "@nextui-org/button";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownSection,
	DropdownTrigger,
} from "@nextui-org/dropdown";

import { CgMenuRight } from "react-icons/cg";

import { AiOutlineShop } from "react-icons/ai";
import { BsCurrencyDollar } from "react-icons/bs";
import { CiBoxes, CiLocationOn } from "react-icons/ci";
import { PiNotepad, PiUserCircleFill, PiUsersThree } from "react-icons/pi";
import { SlLogin } from "react-icons/sl";

export default function MobileMenu() {
	return (
		<Dropdown>
			<DropdownTrigger>
				<Button variant="light" isIconOnly>
					<CgMenuRight className="w-8 h-8" />
				</Button>
			</DropdownTrigger>
			<DropdownMenu>
				<DropdownSection
					title="Características"
					showDivider
					classNames={{
						heading: "text-purple-500",
					}}
				>
					<DropdownItem
						key="/solutions/inventory"
						href="/solutions/inventory"
						startContent={<CiBoxes className="w-4 h-4" />}
						description="Gestiona tu inventario de manera eficiente."
					>
						Administración de inventario
					</DropdownItem>
					<DropdownItem
						key="/solutions/orders"
						href="/solutions/orders"
						startContent={<PiNotepad className="w-4 h-4" />}
						description="Ten todos tus pedidos en un solo lugar"
					>
						Gestor de pedidos
					</DropdownItem>
					<DropdownItem
						key="/solutions/pos"
						href="/solutions/pos"
						startContent={<AiOutlineShop className="w-4 h-4" />}
						description="Vende desde cualquier lugar."
					>
						Punto de ventas
					</DropdownItem>
					<DropdownItem
						key="/solutions/users"
						href="/solutions/users"
						startContent={<PiUsersThree className="w-4 h-4" />}
						description="Controla que puede hacer cada usuario."
					>
						Usuarios
					</DropdownItem>
					<DropdownItem
						key="/solutions/locations"
						href="/solutions/locations"
						startContent={<CiLocationOn className="w-4 h-4" />}
						description="Administra más de una ubicación."
					>
						Ubicaciones
					</DropdownItem>
					<DropdownItem
						key="/solutions/clients"
						href="/solutions/clients"
						startContent={<PiUsersThree className="w-4 h-4" />}
						description="Lleva un registro de tus clientes."
					>
						Clientes
					</DropdownItem>
				</DropdownSection>
				<DropdownSection
					title="¡Inicia ya!"
					classNames={{
						heading: "text-purple-500",
					}}
				>
					<DropdownItem
						key="/pricing"
						href="/pricing"
						startContent={<BsCurrencyDollar className="w-4 h-4" />}
					>
						Precios
					</DropdownItem>
					<DropdownItem
						key="/login"
						href={`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/login`}
						target="_blank"
						startContent={<PiUserCircleFill className="w-4 h-4" />}
					>
						Iniciar sesión
					</DropdownItem>
					<DropdownItem
						key="/register"
						href="/pricing"
						startContent={<SlLogin className="w-4 h-4" />}
					>
						Registrarse
					</DropdownItem>
				</DropdownSection>
			</DropdownMenu>
		</Dropdown>
	);
}
