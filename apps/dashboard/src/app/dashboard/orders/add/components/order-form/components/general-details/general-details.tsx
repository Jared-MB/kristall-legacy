import {
	CardBody,
	CardSubtitle,
	InputContainer,
	InputError,
	Label,
} from "@/components/ui";
import { Combobox } from "@/components/ui/combobox";
import { useQuery } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import { useOrderContext } from "../../../../_context";
import { getLocations } from "../../../_adapters";
import Location from "./components/location";

export default function GeneralDetails({
	errors,
}: {
	errors?: {
		client?: string[];
		location?: string[];
	};
}) {
	// const searchParams = useSearchParams();
	// const [prevSearchParams, setPrevSearchParams] = useState(
	// 	new URLSearchParams(searchParams),
	// );

	const { clients } = useOrderContext();

	const { data: locations } = useQuery({
		queryKey: ["locations"],
		queryFn: async () => await getLocations(),
	});

	// useEffect(() => {
	// 	const newName = searchParams.get("client");
	// 	const prevName = prevSearchParams.get("client");

	// 	if (newName !== prevName) {
	// 		setPrevSearchParams(new URLSearchParams(searchParams));
	// 	}
	// }, [searchParams]);

	const { setValue } = useFormContext();

	return (
		<CardBody>
			<CardSubtitle>Detalles generales</CardSubtitle>
			<div className="flex flex-row items-start gap-x-4">
				<InputContainer>
					<Label>Cliente</Label>
					<Combobox
						queryName="client"
						setSelectedValue={(value) => setValue("client", value)}
						items={
							clients?.map((client) => ({
								value: client.name,
								label: client.name,
								_id: client._id,
							})) ?? []
						}
						entity="cliente"
					/>
					{errors?.client && <InputError>{errors.client[0]}</InputError>}
				</InputContainer>
				<InputContainer>
					<Label>Ubicación</Label>
					<Location locations={locations ?? []} />
					{errors?.location && <InputError>{errors.location[0]}</InputError>}
				</InputContainer>
			</div>
		</CardBody>
	);
}
