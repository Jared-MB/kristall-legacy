import { redirectToOrder } from "@/actions/order.actions";
import { Button } from "@/components/ui/button";
import { Input, InputContainer, InputError } from "@/components/ui/input";

export default function TrackOrder({
	searchParams,
}: {
	searchParams: URLSearchParams;
}) {
	const search = new URLSearchParams(searchParams);

	return (
		<main className="w-full h-[calc(100dvh-4rem)] py-12 md:py-24 lg:py-32 flex items-center">
			<div className="container px-4 md:px-6 text-center">
				<div className="max-w-2xl mx-auto space-y-4">
					<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
						Track Your Order
					</h1>
					<p className="text-gray-500 md:text-xl dark:text-gray-400">
						Enter your order code to check the status of your delivery.
					</p>
					<form
						action={redirectToOrder}
						className="flex w-full max-w-md mx-auto space-x-2"
					>
						<InputContainer>
							<Input
								className="flex-1"
								placeholder="Enter your order code"
								type="text"
								name="code"
							/>
							{search.get("error") === "not-found" && (
								<InputError>Orden no encontrada</InputError>
							)}
						</InputContainer>
						<Button type="submit">Track Order</Button>
					</form>
				</div>
			</div>
		</main>
	);
}
