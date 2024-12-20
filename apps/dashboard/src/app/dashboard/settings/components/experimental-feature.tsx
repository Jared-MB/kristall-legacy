import { FlaskConical } from "lucide-react";
import Link from "next/link";

export function ExperimentalFeature() {
	return (
		<Link href="/dashboard/settings/general/experimental">
			<small className="flex items-center gap-x-1 text-sm text-danger">
				Experimental Feature <FlaskConical className="w-4 h-4" />
			</small>
		</Link>
	);
}
