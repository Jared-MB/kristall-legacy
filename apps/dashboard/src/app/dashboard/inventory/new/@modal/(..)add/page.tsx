import { Dialog, DialogContent, DialogTitle } from "@kristall/ui/dialog";
import AddProductPage from "../../../add/page";

export default function InterceptedAddProductPage() {
	return (
		<Dialog defaultOpen={true} navigateOnClose="/dashboard/inventory/new">
			<DialogTitle className="hidden" aria-hidden>
				{}
			</DialogTitle>
			<DialogContent
				navigateOnClose="/dashboard/inventory/new"
				className="min-w-[70dvw]"
			>
				<AddProductPage redirectTo="/dashboard/inventory/new" />
			</DialogContent>
		</Dialog>
	);
}
