import { Star } from "lucide-react";

export default function Rating() {
	return (
		<div className="flex items-center gap-2 text-sm">
			<div className="flex items-center gap-1">
				<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
				<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
				<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
				<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
				<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
				<span className="font-medium ml-1">4.8</span>
				<span className="text-muted-foreground">(127 reviews)</span>
			</div>
		</div>
	);
}
