import { getLastVersion } from "@kristall/client/utils/version";

export async function Version() {
	const version = await getLastVersion();

	return (
		<span className="absolute bottom-0 right-0 opacity-30 text-xs">
			{version._id}
		</span>
	);
}

export const VersionSkeleton = () => {
	return (
		<span className="absolute bottom-0 right-0 opacity-30 text-xs">...</span>
	);
};
