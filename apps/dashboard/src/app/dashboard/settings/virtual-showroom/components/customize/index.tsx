"use client";

import type { VirtualShowroom } from "@/actions/virtual-showroom";
import Divider from "@/components/divider";
import Svg from "@/components/svg";
import UploadImageSvg from "@/components/svg/upload-image-svg";
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CheckboxLabel,
	Input,
	InputContainer,
	Label,
} from "@/components/ui";
import { useImage } from "@/core/hooks";
import type { PublicProduct } from "@kristall/core/interfaces/products";
import { useRef, useState } from "react";
import Preview from "./preview";

interface Props extends VirtualShowroom {
	name: string;
	products: PublicProduct[] | null;
	newProducts: PublicProduct[] | null;
}

export default function Customize(virtualShowroom: Props) {
	const [isTitleFocused, setIsTitleFocused] = useState(false);
	const [isBannerFocused, setIsBannerFocused] = useState(false);
	const [isAlternativeImageFocused, setIsAlternativeImageFocused] =
		useState(false);
	const [isShowBestSellersFocused, setIsShowBestSellersFocused] =
		useState(false);
	const [isShowNewFocused, setIsShowNewFocused] = useState(false);

	const [title, setTitle] = useState(virtualShowroom.title ?? "");
	const [showBestSellers, setShowBestSellers] = useState(true);
	const [showNew, setShowNew] = useState(true);

	const { handleImageUpload, previewImage } = useImage();
	const {
		handleImageUpload: handleAlternativeImageUpload,
		previewImage: previewAlternativeImage,
	} = useImage();

	const alternativeImageRef = useRef<HTMLInputElement | null>(null);
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const openAlternativeImageInput = () => {
		if (alternativeImageRef.current) {
			alternativeImageRef.current.click();
		}
	};

	const openFileInput = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	return (
		<Card className="grid grid-cols-[1fr_1px_1fr] min-h-[50dvh] relative">
			<div>
				<CardBody>
					<form className="flex flex-col gap-y-4">
						<InputContainer>
							<Label htmlFor="title">Texto inicial</Label>
							<Input
								id="title"
								name="title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								onMouseEnter={() => setIsTitleFocused(true)}
								onMouseLeave={() => setIsTitleFocused(false)}
								onFocus={() => setIsTitleFocused(true)}
								onBlur={() => setIsTitleFocused(false)}
								placeholder="Bienvenido de vuelta"
							/>
						</InputContainer>
						<InputContainer>
							<Label>Configuración</Label>
							<div className="flex flex-col gap-y-3 my-1">
								<div
									onMouseEnter={() => setIsShowBestSellersFocused(true)}
									onMouseLeave={() => setIsShowBestSellersFocused(false)}
									onFocus={() => setIsShowBestSellersFocused(true)}
									onBlur={() => setIsShowBestSellersFocused(false)}
								>
									<CheckboxLabel
										checked={showBestSellers}
										onCheckedChange={(value) =>
											setShowBestSellers(value.valueOf() as boolean)
										}
										id="showBestSellers"
									>
										Mostrar más vendidos
									</CheckboxLabel>
								</div>
								<div
									onMouseEnter={() => setIsShowNewFocused(true)}
									onMouseLeave={() => setIsShowNewFocused(false)}
									onFocus={() => setIsShowNewFocused(true)}
									onBlur={() => setIsShowNewFocused(false)}
								>
									<CheckboxLabel
										id="showNew"
										checked={showNew}
										onCheckedChange={(value) =>
											setShowNew(value.valueOf() as boolean)
										}
									>
										Mostrar nuevos productos
									</CheckboxLabel>
								</div>
							</div>
						</InputContainer>
						<InputContainer>
							<Label>Imagen alternativa</Label>
							<button
								type="button"
								title="Subir imagen"
								onClick={openAlternativeImageInput}
								onMouseEnter={() => setIsAlternativeImageFocused(true)}
								onMouseLeave={() => setIsAlternativeImageFocused(false)}
								onFocus={() => setIsAlternativeImageFocused(true)}
								onBlur={() => setIsAlternativeImageFocused(false)}
								className="border border-dashed border-input w-full h-72"
							>
								{previewAlternativeImage ? (
									<img
										alt="Banner"
										className="h-72 w-full object-cover object-center"
										src={previewAlternativeImage}
									/>
								) : (
									<div className="flex items-center justify-center h-full">
										<Svg className="w-1/3">
											<UploadImageSvg />
										</Svg>
									</div>
								)}
							</button>
							<input
								type="file"
								hidden
								ref={alternativeImageRef}
								onChange={handleAlternativeImageUpload}
							/>
						</InputContainer>
						<InputContainer>
							<Label>Banner</Label>
							<button
								type="button"
								title="Subir imagen"
								onClick={openFileInput}
								onMouseEnter={() => setIsBannerFocused(true)}
								onMouseLeave={() => setIsBannerFocused(false)}
								onFocus={() => setIsBannerFocused(true)}
								onBlur={() => setIsBannerFocused(false)}
								className="border border-dashed border-input w-full h-72"
							>
								{previewImage ? (
									<img
										alt="Banner"
										className="h-72 w-full object-cover object-center"
										src={previewImage}
									/>
								) : (
									<div className="flex items-center justify-center h-full">
										<Svg className="w-1/3">
											<UploadImageSvg />
										</Svg>
									</div>
								)}
							</button>
							<input
								type="file"
								hidden
								ref={fileInputRef}
								onChange={handleImageUpload}
							/>
						</InputContainer>
					</form>
				</CardBody>
				<CardFooter className="justify-end">
					<Button>Guardar</Button>
				</CardFooter>
			</div>
			<Divider orientation="vertical" />
			<CardBody>
				<Preview
					{...virtualShowroom}
					image={previewImage ?? ""}
					title={title}
					products={virtualShowroom.products}
					alternativeImage={previewAlternativeImage ?? ""}
					isShowBestSellersFocused={isShowBestSellersFocused}
					isShowNewFocused={isShowNewFocused}
					isAlternativeImageFocused={isAlternativeImageFocused}
					showBestSellers={showBestSellers}
					showNew={showNew}
					isBannerFocused={isBannerFocused}
					isTitleFocused={isTitleFocused}
				/>
			</CardBody>
		</Card>
	);
}
