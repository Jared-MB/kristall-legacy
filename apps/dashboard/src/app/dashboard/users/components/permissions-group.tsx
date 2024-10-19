import { CheckboxLabel } from "@/components/ui";
import { SectionSubtitle } from "@/components/ui/title";

export default function PermissionsGroup({
	children,
	id,
	enabledAll = false,
	disabledAll = false,
	permissions,
}: {
	children: React.ReactNode;
	id: string;
	enabledAll?: boolean;
	disabledAll?: boolean;
	permissions: `${string}:${string}`[];
}) {
	const access = {
		read: permissions.includes(`${id}:read`),
		write: permissions.includes(`${id}:write`),
		update: permissions.includes(`${id}:update`),
		delete: permissions.includes(`${id}:delete`),
	};

	return (
		<div>
			<SectionSubtitle>{children}</SectionSubtitle>
			<div className="flex flex-col gap-y-2 pt-2">
				<CheckboxLabel
					id={`${id}-read`}
					defaultChecked={enabledAll || access.read}
					disabled={disabledAll}
					type="submit"
					name={`${id}-read`}
				>
					Acceder
				</CheckboxLabel>
				<CheckboxLabel
					id={`${id}-write`}
					defaultChecked={enabledAll || access.write}
					disabled={disabledAll}
					type="submit"
					name={`${id}-write`}
				>
					Crear
				</CheckboxLabel>
				<CheckboxLabel
					id={`${id}-update`}
					defaultChecked={enabledAll || access.update}
					disabled={disabledAll}
					type="submit"
					name={`${id}-update`}
				>
					Editar
				</CheckboxLabel>
				<CheckboxLabel
					id={`${id}-delete`}
					defaultChecked={enabledAll || access.delete}
					disabled={disabledAll}
					type="submit"
					name={`${id}-delete`}
				>
					Borrar
				</CheckboxLabel>
			</div>
		</div>
	);
}
