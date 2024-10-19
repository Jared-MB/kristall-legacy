import { Button } from "@/components/ui/button";
import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Item, ItemTitle, ItemValue } from "@/components/ui/item";
import { ExternalLink, MapPin } from "lucide-react";

export default function Locations() {
	return (
		<div className="absolute flex flex-col gap-y-4 -right-10 top-10 origin-top transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] scale-90 group-hover:scale-105">
			<Card>
				<CardHeader>
					<CardTitle>
						<MapPin className="mr-2" /> Almacén
					</CardTitle>
				</CardHeader>
				<CardBody className="grid grid-cols-2 pt-0 px-12">
					<Item>
						<ItemTitle>Dirección</ItemTitle>
						<ItemValue>Av. 123</ItemValue>
					</Item>
					<Item>
						<ItemTitle>Teléfono</ItemTitle>
						<ItemValue>123456789</ItemValue>
					</Item>
				</CardBody>
				<CardFooter>
					<Button variant="outline">Editar inventario</Button>
					<Button variant="link">
						Ver inventario <ExternalLink className="w-4 h-4 ml-2" />
					</Button>
				</CardFooter>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>
						<MapPin className="mr-2" /> Tienda 1
					</CardTitle>
				</CardHeader>
				<CardBody className="grid grid-cols-2 pt-0 px-12">
					<Item>
						<ItemTitle>Dirección</ItemTitle>
						<ItemValue>Calle 123</ItemValue>
					</Item>
					<Item>
						<ItemTitle>Teléfono</ItemTitle>
						<ItemValue>987654321</ItemValue>
					</Item>
				</CardBody>
				<CardFooter className="gap-x-8">
					<Button variant="outline">Editar inventario</Button>
					<Button variant="link">
						Ver inventario <ExternalLink className="w-4 h-4 ml-2" />
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
