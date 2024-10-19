import { getExpenses } from "@/actions/expenses.actions";
import Search from "@/components/search";

import ExpensesMenu from "./components/expenses-menu";
import ExpensesTable from "./components/expenses-table";

export default async function ExpensesPage() {
	const expenses = await getExpenses();

	return (
		<main className="p-8 h-layout overflow-y-auto">
			<header className="mb-4 grid grid-cols-2">
				<h3 className="text-2xl">Gastos</h3>
				<div className="place flex items-end justify-end gap-x-4">
					<Search
						placeholder="Buscar código..."
						showLabel={false}
						queryName="code"
					/>
					<ExpensesMenu />
				</div>
			</header>
			<section>
				<ExpensesTable expenses={expenses} />
				{/* <TablePagination page={page} totalPages={totalPages} />  */}
			</section>
		</main>
	);
}
