"use client";

import type { Category } from "@kristall/core/interfaces/categories";
import type { Product } from "@kristall/core/interfaces/products";

import { useParams } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { updateProductById } from "@kristall/core/products/id";
import { useBatchesContext } from "../../context/batch-context";
import { useLocationsToAddContext } from "../../context/location-context";

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
import { AddCategoryButton } from "../../categories/components/add-category";
import Batches from "../../components/batches";
import { SelectCategory } from "../../components/inventory-form/select-category";
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
	const [errors, dispatch, isPending] = useActionState(
		enhancedAction,
		undefined,
	);

	useEffect(() => {
		if (typeof errors === "string") {
			toast.success(errors);
		}
	}, [errors]);

	return (
		<Card as="div">
			<form id="edit-product" action={dispatch}>
				<CardBody
					as="section"
					className="grid grid-cols-1 grid-rows-[auto_1px_auto] md:grid-rows-1 md:grid-cols-[1fr_1px_25%] lg:grid-cols-[1fr_1px_15%] p-0"
				>
					<article className="p-6 flex flex-col gap-y-4">
						<CardSubtitle>Información Básica</CardSubtitle>
						<div className="flex flex-row flex-wrap lg:flex-nowrap gap-4 items-start">
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
					<div className="w-full md:w-px h-full bg-zinc-700" />
					<article className="grid place-content-center py-8 px-4 md:py-0">
						<ImagePreview
							fallback={product.name[0]}
							url={product.image?.url}
							id={product.image?._id}
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
							<Label>Categoría*</Label>
							<SelectCategory
								categories={categories}
								defaultValue={product.category?._id}
								disabled={loading}
							/>
							<div className="flex items-center justify-between">
								{typeof errors !== "string" &&
									errors?.errors &&
									"category" in errors.errors &&
									errors.errors.category && (
										<InputError>{errors.errors.category[0]}</InputError>
									)}
								<InputDescription>
									<AddCategoryButton asLink showIcon={false} />
								</InputDescription>
							</div>
						</InputContainer>
					</div>
				</CardBody>
				<Divider />
				<Locations />
				<Batches />
				<CardFooter className="justify-end gap-x-4">
					<RemoveProduct image={product.image} />
					<SaveButton isPending={isPending} />
				</CardFooter>
			</form>
		</Card>
	);
}
