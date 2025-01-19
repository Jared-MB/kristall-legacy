import { getLastVersion } from "@kristall/core/utils";

export default async function Version() {
	const version = await getLastVersion();

	return (
		<span className="absolute bottom-0 right-0 opacity-30 text-xs">
			{version._id}
		</span>
	);
}
