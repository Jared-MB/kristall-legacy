"use client";

import type { Batch as TBatch } from "@/actions/products";
import {
	Card,
	CardBody,
	CardDescription,
	CardHeader,
	buttonVariants,
} from "@/components/ui";
import { Calendar, type SelectedDate } from "@/components/ui/calendar";
import { SectionTitle } from "@/components/ui/title";
import { format } from "@formkit/tempo";
import { CalendarIcon, MapPin, Package } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function BatchesCalendar({
	batches,
}: {
	batches: SelectedDate[];
}) {
	const [selectedBatches, setSelectedBatches] = useState<TBatch[]>([]);

	const onClick = (info: TBatch[]) => {
		setSelectedBatches(info);
	};

	return (
		<main className="p-8 flex flex-col gap-y-8 h-layout overflow-y-auto">
			<Card variant="container">
				<SectionTitle>Lotes</SectionTitle>
				<CardDescription>
					Selecciona una ubicación marcada para ver más información
				</CardDescription>
			</Card>
			<section>
				<Calendar
					numberOfMonths={4}
					pagedNavigation
					disableNavigation
					fromDate={new Date()}
					mode="multiple"
					selectedDates={batches}
					onClick={onClick}
					classNames={{
						day_selected: "bg-rose-500/50 disabled:text-zinc-300",
					}}
				/>
			</section>
			{selectedBatches.map((batch) => (
				<Card key={batch._id}>
					<CardBody>
						<CardHeader className="p-0 pb-4 flex-row justify-between items-center">
							<h6 className="text-lg">{batch.name}</h6>
							<Link
								href={`/dashboard/inventory/${batch.productId}`}
								className={buttonVariants({
									variant: "link",
								})}
							>
								Ver más
							</Link>
						</CardHeader>
						<div className="grid grid-cols-3 text-zinc-400 text-sm">
							<div className="flex flex-row items-center gap-x-1">
								<Package className="w-5 h-5" />
								Stock: {batch.stock}
							</div>
							<div className="flex flex-row items-center gap-x-1">
								<MapPin className="w-5 h-5" />
								Ubicación: {batch.locationProduct}
							</div>
							<div className="flex flex-row items-center gap-x-1">
								<CalendarIcon className="w-5 h-5" />
								Expiración: {format(batch.expirationDate, "DD/MM/YYYY")}
							</div>
						</div>
					</CardBody>
				</Card>
			))}
		</main>
	);
}
