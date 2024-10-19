import { getSessionId } from "./_adapters";
import RegisterForm from "./components/register-form";

export default async function RegisterPage({
	searchParams,
}: {
	searchParams: { [key: string]: string };
}) {
	const session = await getSessionId(searchParams.session_id);
	const customer = session.customer_details;

	return <RegisterForm customer={customer} />;
}
