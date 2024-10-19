import { Package, RESTRICTIONS } from "@/constants";
import { BsCheckLg } from "react-icons/bs";

import {
	CardBody,
	Card as CardContainer,
	CardFooter,
	CardHeader,
} from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Spacer } from "@nextui-org/spacer";
import CardButton from "./button";

interface Props {
	id: string;
	nickname: Package;
	recommended?: boolean;
	price: number;
	features: string[];
}

export default function Card({
	nickname,
	recommended,
	price,
	id,
	features = [],
}: Props) {
	return (
		<CardContainer
			role="card"
			className="basis-1/4 flex flex-col border border-zinc-800/10 rounded-md py-4 px-6 gap-2 relative"
		>
			<CardHeader className="flex flex-col items-center">
				{recommended && (
					<>
						<div className="absolute top-0 left-0 bg-purple-500 dark:text-white rounded-md p-2 w-full text-center">
							<p className="text-xs">Recomendado</p>
						</div>
					</>
				)}
				{recommended && <Spacer y={8} />}
				<div className="flex items-center flex-col gap-2">
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
						<Item key={index} textValue={feature} />
					))}
					<Item
						textValue={`${RESTRICTIONS.MAX_LOCATIONS[nickname]} ubicaci${RESTRICTIONS.MAX_LOCATIONS[nickname] > 1 ? "ones" : "ón"
							}`}
					/>
					<Item
						textValue={`${RESTRICTIONS.MAX_USERS[nickname]} usuario${RESTRICTIONS.MAX_LOCATIONS[nickname] > 1 ? "s" : ""
							}`}
					/>
				</ul>
			</CardBody>
			<Divider />
			<CardFooter className="flex justify-center items-center">
				<CardButton recommended={recommended} id={id} />
			</CardFooter>
		</CardContainer>
	);
}

const Item = ({ textValue }: { textValue: string }) => (
	<li className="flex items-center gap-2">
		<BsCheckLg className="text-purple-500" />
		<span className="text-zinc-300">{textValue}</span>
	</li>
);
