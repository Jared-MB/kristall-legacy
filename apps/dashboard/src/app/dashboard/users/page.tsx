import Divider from "@/components/divider";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionTitle } from "@/components/ui/title";
import { user } from "@/core/modules/users";
import type { User } from "@/core/modules/users/interfaces";
import AddUserForm from "./components/add-user-form";
import UserPermissions from "./components/user-permissions";

export type UserBasic = Pick<
	User,
	"_id" | "username" | "name" | "role" | "email"
>;

export default async function UsersPage() {
	const users = await user.getUsers<UserBasic[]>({
		username: true,
		name: true,
		role: true,
		email: true,
	});

	return (
		<main className="p-8 overflow-y-scroll h-layout flex flex-col gap-y-4">
			<SectionTitle>Usuarios</SectionTitle>
			<Card>
				<CardHeader>
					<CardTitle>Agregar usuario</CardTitle>
					<CardDescription>
						Agrega usuarios para que tengan acceso al Kristall, tú tienes el
						control, puedes darle acceso sólo a las secciones que tu decidas.
					</CardDescription>
				</CardHeader>
				<Divider />
				<AddUserForm />
			</Card>
			<Tabs defaultValue={users[0].username}>
				<TabsList>
					{users.map((user) => (
						<TabsTrigger key={user._id} value={user.username}>
							{user.name}
						</TabsTrigger>
					))}
				</TabsList>
				{users.map((user) => (
					<UserPermissions key={user._id} user={user} />
				))}
			</Tabs>
		</main>
	);
}
