"use client";

import type { Category } from "@kristall/core/interfaces/categories";
import type { Product } from "@kristall/core/interfaces/products";

import { useParams } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { updateProductById } from "@kristall/core/products/id";
import { useBatchesContext } from "../../context/batch-context";
import { useLocationsToAddContext } from "../../context/location-context";

import { ImagePreview } from "@kristall/ui/functional/image-preview";
import { SubmitButton } from "@kristall/ui/functional/submit-button";
import { Input, InputContainer, InputError } from "@kristall/ui/input";
import { Label } from "@kristall/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@kristall/ui/select";
import { Divider } from "@kristall/ui/separator";
import Batches from "../../components/batches";
import Locations from "../../components/locations";
import RemoveProduct from "../components/remove-product";

interface Props {
	product: Product;
	categories: Category[];
	loading?: boolean;
}

export default function ProductForm({
	product,
	categories,
	loading = false,
}: Props) {
	const { locationsToAdd } = useLocationsToAddContext();
	const { batches, isEnabled } = useBatchesContext();

	const enhancedAction = updateProductById.bind(
		null,
		locationsToAdd,
		batches,
		isEnabled,
	);

	const params = useParams();
	const [errors, dispatch] = useActionState(enhancedAction, undefined);

	useEffect(() => {
		if (typeof errors === "string") {
			toast.success(errors);
		}
	}, [errors]);

	return (
		<form
			id="edit-product"
			action={dispatch}
			className="border border-zinc-700 rounded"
		>
			<section className="p-8">
				<h2 className="text-2xl mb-3">{product.name}</h2>
				<p>Los campos marcados con * son obligatorios</p>
				<p>Haz clic en la imagen para cambiarla</p>
			</section>
			<Divider />
			<section className="grid grid-cols-1 grid-rows-[auto_1px_auto] md:grid-rows-1 md:grid-cols-[1fr_1px_25%] lg:grid-cols-[1fr_1px_15%]">
				<article className="p-8 flex flex-col gap-y-4">
					<h3 className="text-xl">Información Básica</h3>
					<div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
						<input
							name="_id"
							aria-hidden
							hidden
							defaultValue={params._id}
							readOnly
						/>
						<InputContainer className="col-span-2 lg:col-span-1">
							<Label>Nombre*</Label>
							<Input
								name="name"
								defaultValue={product.name}
								disabled={loading}
							/>
						</InputContainer>
						<InputContainer>
							<Label>Código</Label>
							<Input
								name="code"
								type="number"
								defaultValue={product.code}
								placeholder="000000000"
								disabled={loading}
							/>
							{typeof errors !== "string" &&
								errors?.errors &&
								"code" in errors.errors &&
								errors.errors.code && (
									<InputError>{errors.errors.code[0]}</InputError>
								)}
						</InputContainer>
						<InputContainer>
							<Label>
								Agregado{" "}
								<small className="hidden md:inline-block text-zinc-400">
									(YYYY-MM-DD)
								</small>
							</Label>
							<Input defaultValue={product.createdAt} readOnly />
						</InputContainer>
					</div>
				</article>
				<div className="w-full md:w-[1px] h-full bg-zinc-700" />
				<article className="grid place-content-center py-8 px-4 md:py-0">
					<ImagePreview
						fallback={product.name[0]}
						url={product.image?.url}
						id={product.image?._id}
					/>
				</article>
			</section>
			<Divider />
			<section className="p-8 flex flex-col gap-y-4">
				<h3 className="text-xl">Precio y categoría</h3>
				<div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
					<InputContainer>
						<Label>Precio*</Label>
						<Input
							name="price"
							icon="$"
							type="number"
							step="0.01"
							disabled={loading}
							defaultValue={product.price}
						/>
						{typeof errors !== "string" &&
							errors?.errors &&
							"price" in errors.errors &&
							errors.errors.price && (
								<InputError>{errors.errors.price[0]}</InputError>
							)}
					</InputContainer>
					<InputContainer>
						<Label>Costo</Label>
						<Input
							name="cost"
							step="0.01"
							icon="$"
							type="number"
							defaultValue={product.cost}
							disabled={loading}
						/>
						{typeof errors !== "string" &&
							errors?.errors &&
							"cost" in errors.errors &&
							errors.errors.cost && (
								<InputError>{errors.errors.cost[0]}</InputError>
							)}
					</InputContainer>
					<InputContainer className="col-span-2 lg:col-span-1">
						<Label>Categoría</Label>
						<Select
							name="category"
							defaultValue={product.category?._id}
							disabled={loading}
						>
							<SelectTrigger>
								<SelectValue placeholder="Selecciona una categoría" />
							</SelectTrigger>
							<SelectContent>
								{categories.map((category) => (
									<SelectItem key={category._id} value={category._id}>
										{category.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{typeof errors !== "string" &&
							errors?.errors &&
							"category" in errors.errors &&
							errors.errors.category && (
								<InputError>{errors.errors.category[0]}</InputError>
							)}
					</InputContainer>
				</div>
			</section>
			<Divider />
			<Locations />
			<Batches />
			<footer className="px-8 py-6 bg-zinc-950/50 rounded-b flex flex-row justify-end items-center gap-x-4">
				<RemoveProduct image={product.image} />
				<SubmitButton pendingText="Guardando cambios">
					Guardar cambios
				</SubmitButton>
			</footer>
		</form>
	);
}
