import { stripe } from "@kristall/core/modules/stripe";
import { redirect } from "next/navigation";
import RegisterForm from "./components/register-form";

export default async function RegisterPage(props: {
	searchParams: Promise<{ [key: string]: string | null }>;
}) {
	const searchParams = await props.searchParams;
	const session = await stripe.getStripeSession(searchParams.session_id);

	if (!session) {
		redirect("/login");
	}

	const customer = session.customer_details;

	return <RegisterForm customer={customer} />;
}
