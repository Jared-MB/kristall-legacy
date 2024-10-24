import { type Package, RESTRICTIONS } from "@/constants";

import { Check } from "lucide-react";

import { Card, CardBody, CardFooter, CardHeader } from "@kristall/ui/card";
import { Divider } from "@kristall/ui/separator";

import { cn } from "@/lib/utils";
import Pay from "./pay";

interface Props {
	id: string;
	nickname: Package;
	recommended?: boolean;
	price: number;
	features: string[];
}

export default function Price({
	nickname,
	recommended,
	price,
	id,
	features = [],
}: Props) {
	return (
		<Card className="h-fit w-full">
			<CardHeader className="flex flex-col items-center">
				{recommended && (
					<>
						<div className="absolute top-0 left-0 bg-purple-500 dark:text-white rounded-md p-2 w-full text-center">
							<p className="text-xs">Recomendado</p>
						</div>
					</>
				)}
				<div
					className={cn(
						"flex items-center flex-col gap-2",
						recommended && "pt-8",
					)}
				>
					<h2 className="text-purple-500 text-xl uppercase">{nickname}</h2>
					<p className="text-purple-500 text-xl">
						$<span className="text-4xl font-medium">{price}</span>/mes
					</p>
				</div>
			</CardHeader>
			<Divider />
			<CardBody>
				<ul>
					{features.map((feature, index) => (
						<Item
							key={`${feature}-${index}-${Math.random()}`}
							textValue={feature}
						/>
					))}
					<Item
						textValue={`${RESTRICTIONS.MAX_LOCATIONS[nickname]} ubicaci${
							RESTRICTIONS.MAX_LOCATIONS[nickname] > 1 ? "ones" : "ón"
						}`}
					/>
					<Item
						textValue={`${RESTRICTIONS.MAX_USERS[nickname]} usuario${
							RESTRICTIONS.MAX_LOCATIONS[nickname] > 1 ? "s" : ""
						}`}
					/>
				</ul>
			</CardBody>
			<Divider />
			<CardFooter className="flex justify-center items-center">
				<Pay recommended={recommended} id={id} />
			</CardFooter>
		</Card>
	);
}

const Item = ({ textValue }: { textValue: string }) => (
	<li className="flex items-center gap-2">
		<Check className="text-purple-500 w-4 h-4" />
		<span className="text-zinc-300">{textValue}</span>
	</li>
);
