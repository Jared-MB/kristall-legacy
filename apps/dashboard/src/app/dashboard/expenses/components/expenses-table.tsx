import {
	Button,
	DropdownMenu,
	DropdownMenuTrigger,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui";
import { Badge } from "@/components/ui/badge";
import type { Expense } from "@/types/expense";
import { format } from "@formkit/tempo";
import { MoreVertical } from "lucide-react";

export default function ExpensesTable({ expenses }: { expenses: Expense[] }) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Concepto</TableHead>
					<TableHead>Monto</TableHead>
					<TableHead>Usuario</TableHead>
					<TableHead>Fecha</TableHead>
					<TableHead>Estado</TableHead>
					<TableHead />
				</TableRow>
			</TableHeader>
			<TableBody>
				{expenses.map((expense) => (
					<TableRow key={expense._id}>
						<TableCell>{expense.concept}</TableCell>
						<TableCell>${expense.amount}</TableCell>
						<TableCell>{expense.user.name}</TableCell>
						<TableCell>
							{format(new Date(expense.date), "DD-MM-YYYY")}
						</TableCell>
						<TableCell>
							<Badge variant="outline" showPin>
								{expense.cancellation?.isCancelled ? "Cancelado" : "Activo"}
							</Badge>
						</TableCell>
						<TableCell>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button size="icon" variant="ghost">
										<MoreVertical />
									</Button>
								</DropdownMenuTrigger>
							</DropdownMenu>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
