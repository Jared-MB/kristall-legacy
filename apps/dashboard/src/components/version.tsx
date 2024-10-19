import VERSIONS from "@/constants/versions";

export default function Version() {
	return (
		<span className="absolute bottom-0 right-0 opacity-30 text-xs">
			{VERSIONS[0]._id}
		</span>
	);
}
