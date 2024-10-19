import { Button } from "@/components/ui/button";
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
import { Card } from "@nextui-org/card";
import { MoreVertical, Search, Shapes, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { AiOutlineRise } from "react-icons/ai";
import { BsBoxSeam } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";

export default function InventoryHome() {
	return (
		<section>
			<article className="relative pt-8 pb-12 z-10">
				<div className=" flex md:grid lg:grid xl:grid grid-cols-[55%_1fr] gap-20 place-items-center pt-4 md:pt-12 lg:pt-12 mx-8 md:mx-20 lg:mx-20">
					<div className="flex items-center flex-col gap-6">
						<h2 className="text-4xl md:text-5xl lg:text-5xl font-medium text-center pt-4 max-w-3xl text-purple-500">
							Crea productos, gestiona tu inventario y empieza a vender
						</h2>
						<p className="text-center max-w-xl">
							Obtén una visión completa de tu inventario para gestionar
							eficientemente productos, conociendo el stock disponible, los más
							vendidos y los más rentables.
						</p>
						<Button asChild>
							<Link href="/pricing">Crear cuenta</Link>
						</Button>
					</div>
					<Image
						src="/svg/inventory.svg"
						alt="Inventory"
						width={360}
						height={360}
						className="hidden lg:block md:block xl:block"
					/>
				</div>
			</article>
			<div className="relative px-16 pt-8 pb-12">
				<article className="grid grid-row-3 md:grid-rows-1 lg:grid-rows-1 md:grid-cols-3 lg:grid-cols-3 gap-4 relative z-10">
					<div>
						<h3 className="text-2xl font-medium pt-8 pb-4 text-purple-500 flex items-center gap-4">
							<BsBoxSeam />
							Crea productos
						</h3>
						<p className="max-w-xs text-sm">
							Crea productos con su nombre, descripción, precio, categoría y
							foto.
						</p>
					</div>
					<div>
						<h3 className="text-2xl font-medium pt-8 pb-4 text-purple-500 flex items-center gap-4">
							<CiLocationOn />
							Añade ubicaciones
						</h3>
						<p className="max-w-xs text-sm">
							Añade ubicaciones para saber en qué lugar de tu negocio se
							encuentra cada producto.
						</p>
					</div>
					<div>
						<h3 className="text-2xl font-medium pt-8 pb-4 text-purple-500 flex items-center gap-4">
							<AiOutlineRise /> Conoce tu inventario
						</h3>
						<p className="max-w-xs text-sm">
							Gestiona tu inventario conociendo el stock disponible, los más
							vendidos y los más rentables.
						</p>
					</div>
				</article>
				<article className="flex md:grid lg:grid grid-cols-[1fr_45dvw] relative z-10 mt-28 gap-16">
					<div className="flex flex-col justify-center gap-8">
						{/* Titulo */}
						<h3 className="text-4xl font-medium text-purple-500">
							Visión completa de tu inventario
						</h3>
						{/* Descripcion */}
						<p className="max-w-lg ml-8 text-lg text-pretty">
							¡Optimiza tu negocio con nuestro sistema de gestión de inventario!
							Obtén una visión completa de tus productos para una administración
							eficiente.
						</p>
						{/* Boton */}
						<div>
							<Button asChild>
								<Link href="/pricing">¡Empieza ahora!</Link>
							</Button>
						</div>
					</div>
					<Card className="relative w-full h-fit p-4 hidden md:flex lg:flex">
						<header className="flex flex-row gap-x-2 mb-4 justify-end">
							<Input
								icon={<Search />}
								classNames={{
									container: "w-[256px]",
								}}
								placeholder="Buscar..."
							/>
							<Select>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Ubicación" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="a">Almacén</SelectItem>
									<SelectItem value="b">Sucursal 1</SelectItem>
									<SelectItem value="c">Sucursal 2</SelectItem>
								</SelectContent>
							</Select>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="outline" size="icon">
										<MoreVertical />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuLabel>Opciones</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem className="flex flex-row items-center gap-x-2">
										<Upload />
										Crear producto
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem className="flex flex-row gap-x-2 items-center">
										<Shapes />
										Ver categorías
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</header>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead />
									<TableHead>Nombre</TableHead>
									<TableHead>Precio</TableHead>
									<TableHead>Stock</TableHead>
									<TableHead />
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow key={12323}>
									<TableCell>
										<Image
											src="/favicon.ico"
											className="rounded"
											alt="Product"
											width={42}
											height={42}
										/>
									</TableCell>
									<TableCell>Producto 1</TableCell>
									<TableCell>$100</TableCell>
									<TableCell>8</TableCell>
									<TableCell>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="ghost" size="icon">
													<MoreVertical />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent>
												<DropdownMenuLabel>Opciones</DropdownMenuLabel>
												<DropdownMenuSeparator />
												<DropdownMenuItem>Ver más</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
								<TableRow key={8653452}>
									<TableCell>
										<Image
											src="/favicon.ico"
											className="rounded"
											alt="Product"
											width={42}
											height={42}
										/>
									</TableCell>
									<TableCell>Producto 2</TableCell>
									<TableCell>$225</TableCell>
									<TableCell>7</TableCell>
									<TableCell>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="ghost" size="icon">
													<MoreVertical />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent>
												<DropdownMenuLabel>Opciones</DropdownMenuLabel>
												<DropdownMenuSeparator />
												<DropdownMenuItem>Ver más</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
								<TableRow key={33244}>
									<TableCell>
										<Image
											src="/favicon.ico"
											className="rounded"
											alt="Product"
											width={42}
											height={42}
										/>
									</TableCell>
									<TableCell>Producto 3</TableCell>
									<TableCell>$150</TableCell>
									<TableCell>13</TableCell>
									<TableCell>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="ghost" size="icon">
													<MoreVertical />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent>
												<DropdownMenuLabel>Opciones</DropdownMenuLabel>
												<DropdownMenuSeparator />
												<DropdownMenuItem>Ver más</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
						{/* <Image
              quality={100}
              width={540}
              height={360}
              alt='Inventory'
              src='/landing_page/inventory.png'
            /> */}
					</Card>
				</article>
				{/*<div className='absolute inset-0 bg-gradient-to-t from-zinc-800/90 to-zinc-900 w-[calc(100dvw-8px)] left-0 z-0' />*/}
			</div>
		</section>
	);
}
