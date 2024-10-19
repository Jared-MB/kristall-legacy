"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";
import { DayPicker } from "react-day-picker";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/core/utils";
import { es } from "date-fns/locale";

export interface SelectedDate {
	date: Date;
	info: any;
}

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
	selectedDates?: SelectedDate[];
	onClick?: (info: any) => void;
};

function Calendar({
	className,
	classNames,
	showOutsideDays = true,
	...props
}: CalendarProps) {
	return (
		<DayPicker
			selected={props.selectedDates?.map((date) => date.date) ?? ([] as any)}
			showOutsideDays={showOutsideDays}
			className={cn("p-3", className)}
			classNames={{
				months:
					"flex flex-col sm:flex-row gap-8 space-y-4 sm:space-x-4 sm:space-y-0 flex-wrap justify-between w-full h-full",
				month: "space-y-4 capitalize",
				caption: "flex justify-center pt-1 relative items-center",
				caption_label: "text-sm font-medium",
				nav: "space-x-1 flex items-center",
				nav_button: cn(
					buttonVariants({ variant: "outline" }),
					"h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
				),
				nav_button_previous: "absolute left-1",
				nav_button_next: "absolute right-1",
				table: "w-full border-collapse space-y-1",
				head_row: "flex",
				head_cell:
					"text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
				row: "flex w-full mt-2",
				cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
				day: cn(
					buttonVariants({ variant: "ghost" }),
					"h-9 w-9 p-0 font-normal aria-selected:opacity-100",
				),
				day_range_end: "day-range-end",
				day_selected: cn(
					"bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
					classNames?.day_selected,
				),
				day_today: "bg-accent text-accent-foreground",
				day_outside:
					"day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
				day_disabled: "text-muted-foreground opacity-50",
				day_range_middle:
					"aria-selected:bg-accent aria-selected:text-accent-foreground",
				day_hidden: "invisible",
				...classNames,
			}}
			components={{
				IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
				IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
				DayContent: ({ date, ...componentsProps }) => {
					const isToday = useMemo(() => {
						if (Array.isArray(props.selectedDates)) {
							const find = props.selectedDates.find((selectedDate) => {
								const ad = new Date(selectedDate.date);
								return ad.toDateString() === date.toDateString();
							});
							return find;
						}
					}, []);

					const handleClick = () => {
						if (isToday) {
							props.onClick?.(isToday.info);
						}
					};

					return (
						// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
						<span
							className={cn(
								"flex items-center justify-center h-full w-full relative",
							)}
							onClick={handleClick}
						>
							{isToday && (
								<Badge className="absolute text-[8px] w-4 h-4 p-0 flex justify-center items-center -right-1 -top-1 z-50 text-center m-0">
									{isToday.info.length}
								</Badge>
							)}
							{date.getDate()}
						</span>
					);
				},
			}}
			{...props}
			locale={es}
		/>
	);
}
Calendar.displayName = "Calendar";

export { Calendar };
