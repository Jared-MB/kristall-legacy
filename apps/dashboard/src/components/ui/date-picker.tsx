"use client";

import { subDays } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/core/utils";
import { format as formatDate } from "@formkit/tempo";
import { type HTMLAttributes, useState } from "react";

const format = (date: Date) =>
	formatDate({
		date,
		format: "MMM DD, YYYY",
		locale: "es",
	});

export function DatePickerWithRange({
	className,
}: HTMLAttributes<HTMLDivElement>) {
	const [date, setDate] = useState<DateRange | undefined>({
		from: subDays(new Date(), 30),
		to: new Date(),
	});

	return (
		<div className={cn("grid gap-2", className)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id="date"
						variant={"outline"}
						className={cn(
							"max-w-xs justify-start text-left font-normal",
							!date && "text-muted-foreground",
						)}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{date?.from ? (
							date.to ? (
								<>
									{format(date.from)} - {format(date.to)}
								</>
							) : (
								format(date.from)
							)
						) : (
							<span>Pick a date</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						initialFocus
						mode="range"
						defaultMonth={date?.from}
						selected={date}
						onSelect={setDate}
						numberOfMonths={2}
					/>
				</PopoverContent>
			</Popover>
			<input
				hidden
				defaultValue={date?.from?.toDateString()}
				name="from"
				readOnly
			/>
			<input
				hidden
				defaultValue={date?.to?.toDateString()}
				name="to"
				readOnly
			/>
		</div>
	);
}

export function DatePicker({
	date,
	setDate,
	fromDate,
}: {
	date: Date | undefined;
	setDate: (date: Date | undefined) => void;
	fromDate?: Date;
}) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"w-[280px] justify-start text-left font-normal capitalize",
						!date && "text-muted-foreground",
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{date ? format(date) : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					mode="single"
					selected={date}
					onSelect={setDate}
					initialFocus
					fromDate={fromDate}
					locale={es}
				/>
			</PopoverContent>
		</Popover>
	);
}
