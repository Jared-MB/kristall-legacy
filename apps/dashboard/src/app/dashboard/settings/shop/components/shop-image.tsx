"use client";

import { setShopImage } from "@/actions/user.actions";
import ProductImage from "@/components/form-product-image";
import { Button } from "@/components/ui";
import Link from "next/link";
import { toast } from "sonner";

export default function ShopImage({
	logo,
	shopName,
}: {
	logo: string;
	shopName: string;
}) {
	return (
		<ProductImage
			url={logo}
			fallback={shopName.charAt(0)}
			options={{
				submitOnChange: true,
				uploadFunction: async (url, prevState) => {
					try {
						await setShopImage(url, prevState);
						toast.success(
							"Imagen actualizada, puede tardar unos minutos en reflejarse o recargue la página para ver los cambios",
							{
								action: (
									<Button asChild size="sm" variant="outline">
										<Link href="/docs/faq#profile-image-not-updating">
											Ver más
										</Link>
									</Button>
								),
							},
						);
					} catch (error) {
						toast.error("Error al actualizar la imagen");
					}
				},
			}}
		/>
	);
}
