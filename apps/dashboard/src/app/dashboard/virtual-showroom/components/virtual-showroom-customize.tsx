import { ScrollArea } from "@kristall/ui/scroll-area";
import { Preview } from "./customize/preview";

export function VirtualShowroomCustomize() {
	return (
		<ScrollArea className="px-6 h-full relative">
			<Preview />
		</ScrollArea>
	);
}
