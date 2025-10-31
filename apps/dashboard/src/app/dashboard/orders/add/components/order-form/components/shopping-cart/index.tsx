"use client";

import SelectLocations from "@/app/dashboard/sales/components/select-locations";
import Divider from "@/components/divider";
import Search from "@/components/search";
import {
	CardBody,
	InputContainer,
	Label,
	Select,
	SelectTrigger,
	SelectValue,
} from "@/components/ui";
import { useCartStore } from "@/core/store";
import { useQuery } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import { getLocations } from "../../../_adapters";
import ShoppingCardProducts from "./products";
import ShoppingCartProductsSummary from "./products-summary";

export default function ShoppingCart() {
	const { data: locations, isLoading } = useQuery({
		queryKey: ["locations"],
		queryFn: async () => await getLocations(),
	});

	const { setValue } = useFormContext();
	const clearCart = useCartStore((store) => store.clearCart);

	const handleChange = (value: string) => {
		setValue("productsFrom", value);
		clearCart();
	};

	return (
		<div className="grid grid-cols-[1fr_1px_40%]">
			<CardBody>
				<header className="flex items-center gap-x-4 h-15">
					<Search queryName="name" />
					{isLoading ? (
						<InputContainer>
							<Label>Ubicación</Label>
							<Select>
								<SelectTrigger disabled className="w-[180px]">
									<SelectValue placeholder="Cargando ubicaciones..." />
								</SelectTrigger>
							</Select>
						</InputContainer>
					) : (
						<SelectLocations
							setSelectedValue={handleChange}
							locations={locations ?? []}
						/>
					)}
				</header>
				<ShoppingCardProducts />
			</CardBody>
			<Divider orientation="vertical" />
			<CardBody>
				<ShoppingCartProductsSummary />
			</CardBody>
		</div>
	);
}
