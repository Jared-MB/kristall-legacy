import { stripe } from "@kristall/core/modules/stripe";
import { redirect } from "next/navigation";
import RegisterForm from "./components/register-form";

export default async function RegisterPage({
	searchParams,
}: {
	searchParams: { [key: string]: string | null };
}) {
	const session = await stripe.getStripeSession(searchParams.session_id);

	if (!session) {
		redirect("/login");
	}

	const customer = session.customer_details;

	return <RegisterForm customer={customer} />;
}
