"use client";

import type { Category } from "@kristall/core/modules/categories/interfaces";

import { products } from "@kristall/core/modules/products";
import { Button } from "@kristall/ui/button";

import Divider from "@/components/divider";
import ProductImage from "@/components/form-product-image";
import {
	Card,
	CardBody,
	CardFooter,
	CardSubtitle,
	Switch,
	SwitchContainer,
} from "@/components/ui";
import {
	Input,
	InputContainer,
	InputDescription,
	InputError,
} from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useShortcut } from "@/core/hooks/useShortcut";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import AddCategory from "../../categories/components/add-category";
import Batches from "../../components/batches";
import Locations from "../../components/locations";
import { useBatchesContext } from "../../context/batch-context";
import { useLocationsToAddContext } from "../../context/location-context";
import SaveButton from "./components/save-button";

interface Props {
	categories: Category[];
}

export default function AddProductForm({ categories }: Props) {
	const { locationsToAdd, clearLocations } = useLocationsToAddContext();
	const { batches, isEnabled, clearBatches } = useBatchesContext();

	const [isCreatingMany, setIsCreatingMany] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);

	const enhancedAction = products.uploadProduct.bind(
		null,
		locationsToAdd,
		batches,
		isEnabled,
		isCreatingMany,
	);

	const [errors, dispatch] = useActionState(enhancedAction, undefined);

	const router = useRouter();

	useEffect(() => {
		if (errors) {
			if ("success" in errors && errors.success) {
				toast.success("Producto creado correctamente");
				clearLocations();
				clearBatches();
				formRef.current?.reset();
			}
			"message" in errors && toast.error(errors.message);
			"locations" in errors &&
				errors.locations &&
				toast.error(errors.locations[0]);
			"size" in errors &&
				toast.info(errors.size, {
					action: (
						<Button asChild size="sm" variant="outline">
							<Link href="/docs/faq#image-size-limit">Ver más</Link>
						</Button>
					),
				});
		}
	}, [errors]);

	useShortcut(
		["enter"],
		() => {
			if (formRef.current) {
				formRef.current.requestSubmit();
			}
		},
		{
			ctrl: true,
		},
	);

	return (
		<Card as="div">
			<form action={dispatch} ref={formRef}>
				<CardBody
					as="section"
					className="grid grid-cols-1 grid-rows-[auto_1px_auto] md:grid-rows-1 md:grid-cols-[1fr_1px_25%] lg:grid-cols-[1fr_1px_15%] p-0"
				>
					<article className="p-6 flex flex-col gap-y-4">
						<CardSubtitle>Información Básica</CardSubtitle>
						<div className="flex flex-row flex-wrap lg:flex-nowrap gap-4 items-start">
							<InputContainer>
								<Label>Nombre*</Label>
								<Input name="name" placeholder="Ej. Galletas" />
								{errors && "name" in errors && errors?.name && (
									<InputError>{errors.name[0]}</InputError>
								)}
							</InputContainer>
							<InputContainer>
								<Label>Código</Label>
								<Input name="code" type="number" placeholder="000000000" />
							</InputContainer>
						</div>
					</article>
					<div className="w-full md:w-[1px] h-full bg-zinc-700" />
					<article className="grid place-content-center py-6 px-4 md:py-0">
						<ProductImage
							classNames={{
								fallback: "text-sm text-center text-pretty",
							}}
							fallback="Click para agregar una imagen"
							url={""}
						/>
					</article>
				</CardBody>
				<Divider />
				<CardBody as="section">
					<CardSubtitle>Precio y categoría</CardSubtitle>
					<div className="grid grid-cols-2 lg:grid-cols-3 gap-4 items-start">
						<InputContainer>
							<Label>Precio*</Label>
							<Input name="price" icon="$" type="number" placeholder="0" />
							{errors && "price" in errors && errors?.price && (
								<InputError>{errors.price[0]}</InputError>
							)}
						</InputContainer>
						<InputContainer>
							<Label>Costo</Label>
							<Input name="cost" icon="$" type="number" placeholder="0" />
						</InputContainer>
						<InputContainer
							classNames={{
								container: "col-span-2 lg:col-span-1",
							}}
						>
							<Label>Categoría*</Label>
							{/* <Input defaultValue={product.category.name} /> */}
							<Select
								name="category"
								onValueChange={(value) =>
									value === "create" &&
									router.push("/dashboard/inventory/categories")
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="Selecciona una categoría" />
								</SelectTrigger>
								<SelectContent>
									{categories.length > 0 ? (
										categories.map((category) => (
											<SelectItem key={category._id} value={category._id}>
												{category.name}
											</SelectItem>
										))
									) : (
										<>
											<SelectItem disabled value="no-value">
												No hay categorías disponibles
											</SelectItem>
											<SelectItem value="create">
												Crear una categoría
											</SelectItem>
										</>
									)}
								</SelectContent>
							</Select>
							<div className="flex items-center justify-between">
								{errors && "category" in errors && errors?.category && (
									<InputError>{errors.category[0]}</InputError>
								)}
								<InputDescription>
									<AddCategory asLink showIcon={false} />
								</InputDescription>
							</div>
						</InputContainer>
					</div>
				</CardBody>
				<Divider />
				<Locations />
				<Batches />
				<CardFooter className="justify-end gap-x-4">
					<SwitchContainer className="scale-75" title="Crear más productos">
						<Switch
							id="create-many"
							checked={isCreatingMany}
							onCheckedChange={() => setIsCreatingMany(!isCreatingMany)}
						/>
						<Label htmlFor="create-many" className="text-lg">
							Crear más
						</Label>
					</SwitchContainer>
					<Button variant="outline" asChild>
						<Link href="/dashboard/inventory">Cancelar</Link>
					</Button>
					<SaveButton />
				</CardFooter>
			</form>
		</Card>
	);
}
