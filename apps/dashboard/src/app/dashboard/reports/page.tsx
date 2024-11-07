import { format } from "@formkit/tempo";
import { MoreVertical } from "lucide-react";

import { reports } from "@kristall/core/modules/reports";

import { Badge } from "@kristall/ui/badge";
import { Button } from "@kristall/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@kristall/ui/table";

export default async function ReportsPage() {
	const latestReports = await reports.getLatestReports();

	return (
		<main className="p-4">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Mensaje de Error</TableHead>
						<TableHead>Nivel de gravedad</TableHead>
						<TableHead>Fecha</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{latestReports.length === 0 ? (
						<TableRow>
							<TableCell colSpan={3} className="text-center h-[200px]">
								No hay reportes disponibles
							</TableCell>
						</TableRow>
					) : (
						latestReports.map((report) => (
							<TableRow key={report._id}>
								<TableCell>{report.errorMessage}</TableCell>
								<TableCell>
									<Badge>{report.severity}</Badge>
								</TableCell>
								<TableCell className="capitalize">
									{format(report.createdAt, { date: "full", time: "short" })}
								</TableCell>
								<TableCell>
									<Button size="icon" variant="outline">
										<MoreVertical />
									</Button>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</main>
	);
}
