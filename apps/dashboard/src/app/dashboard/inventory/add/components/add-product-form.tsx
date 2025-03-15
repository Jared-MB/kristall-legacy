"use client";

import type { Category } from "@kristall/core/modules/categories/interfaces";
import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { useShortcut } from "@kristall/core/hooks/use-shortcut";
import { uploadProduct } from "@kristall/core/products/upload";
import { useBatchesContext } from "../../context/batch-context";
import { useLocationsToAddContext } from "../../context/location-context";

import { Button } from "@kristall/ui/button";
import { Card, CardBody, CardFooter, CardSubtitle } from "@kristall/ui/card";
import { ImagePreview } from "@kristall/ui/functional/image-preview";
import { SaveButton } from "@kristall/ui/functional/submit-button";
import {
	Input,
	InputContainer,
	InputDescription,
	InputError,
} from "@kristall/ui/input";
import { Label } from "@kristall/ui/label";
import { Divider } from "@kristall/ui/separator";
import { Switch, SwitchContainer } from "@kristall/ui/switch";
import { AddCategory } from "../../categories/components/add-category";
import Batches from "../../components/batches";
import { SelectCategory } from "../../components/inventory-form/select-category";
import Locations from "../../components/locations";

interface Props {
	categories: Category[];
	redirectTo?: `/${string}`;
}

export default function AddProductForm({
	categories,
	redirectTo = undefined,
}: Props) {
	const { locationsToAdd, clearLocations } = useLocationsToAddContext();
	const { batches, isEnabled, clearBatches } = useBatchesContext();

	const [isCreatingMany, setIsCreatingMany] = useState(false);

	const [formData, setFormData] = useState({
		name: "",
		code: "",
		price: "",
		cost: "",
		category: "",
	});

	const formRef = useRef<HTMLFormElement>(null);

	const enhancedAction = uploadProduct.bind(
		null,
		locationsToAdd,
		batches,
		isEnabled,
		isCreatingMany,
		redirectTo,
	);

	const [actionErrors, dispatch, isPending] = useActionState(
		enhancedAction,
		undefined,
	);

	useEffect(() => {
		if (actionErrors) {
			if ("success" in actionErrors && actionErrors.success) {
				toast.success("Producto creado correctamente");
				clearLocations();
				clearBatches();
				formRef.current?.reset();
				setFormData({ name: "", code: "", price: "", cost: "", category: "" });
			}
			"message" in actionErrors && toast.error(actionErrors.message);
			"locations" in actionErrors &&
				actionErrors.locations &&
				toast.error(actionErrors.locations[0]);
			"size" in actionErrors &&
				toast.info(actionErrors.size, {
					action: (
						<Button asChild size="sm" variant="outline">
							<Link href="/docs/faq#image-size-limit">Ver más</Link>
						</Button>
					),
				});
		}
	}, [actionErrors]);

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

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

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
								<Input
									name="name"
									placeholder="Ej. Galletas"
									value={formData.name}
									onChange={handleInputChange}
								/>
								{actionErrors &&
									"name" in actionErrors &&
									actionErrors?.name && (
										<InputError>{actionErrors.name[0]}</InputError>
									)}
							</InputContainer>
							<InputContainer>
								<Label>Código</Label>
								<Input
									name="code"
									type="number"
									placeholder="000000000"
									value={formData.code}
									onChange={handleInputChange}
								/>
							</InputContainer>
						</div>
					</article>
					<div className="w-full md:w-[1px] h-full bg-zinc-700" />
					<article className="grid place-content-center py-6 px-4 md:py-0">
						<ImagePreview
							fallback={
								<span className="text-sm text-center text-pretty">
									Click para agregar una imagen
								</span>
							}
						/>
					</article>
				</CardBody>
				<Divider />
				<CardBody as="section">
					<CardSubtitle>Precio y categoría</CardSubtitle>
					<div className="grid grid-cols-2 lg:grid-cols-3 gap-4 items-start">
						<InputContainer>
							<Label>Precio*</Label>
							<Input
								name="price"
								icon="$"
								type="number"
								placeholder="0"
								value={formData.price}
								onChange={handleInputChange}
							/>
							{actionErrors &&
								"price" in actionErrors &&
								actionErrors?.price && (
									<InputError>{actionErrors.price[0]}</InputError>
								)}
						</InputContainer>
						<InputContainer>
							<Label>Costo</Label>
							<Input
								name="cost"
								icon="$"
								type="number"
								placeholder="0"
								value={formData.cost}
								onChange={handleInputChange}
							/>
						</InputContainer>
						<InputContainer className="col-span-2 lg:col-span-1">
							<Label>Categoría*</Label>
							<SelectCategory categories={categories} />
							<div className="flex items-center justify-between">
								{actionErrors &&
									"category" in actionErrors &&
									actionErrors?.category && (
										<InputError>{actionErrors.category[0]}</InputError>
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
					<SaveButton isPending={isPending} />
				</CardFooter>
			</form>
		</Card>
	);
}
