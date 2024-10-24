import Service from "@/components/service";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/core/utils";
import { addDay, format } from "@formkit/tempo";
import {
	Activity,
	CalendarIcon,
	ChartBar,
	ClockIcon,
	GalleryThumbnails,
	Server,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { checkServices } from "./services";

export default async function Home() {
	const services = await checkServices();
	const [dashboard, api, showroom] = services;

	const isAllOperational = services.every((service) => service.status === "ok");
	const isAllDown = services.every((service) => service.status === "error");

	let status = "Operational";
	let message = "All services are operational";
	let description =
		"We are happy to announce that all services are operational.";

	if (isAllDown) {
		message = "We are experiencing troubles with our services";
		description = "We are working hard to fix the issues.";
		status = "All services are down";
	} else if (!isAllOperational && !isAllDown) {
		message = "We are experiencing troubles with some of our services";
		description = "We are working hard to fix the issues.";
		status = "Degraded";
	}

	return (
		<div className="flex flex-col min-h-screen">
			<header className="py-4 px-6 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Activity className="h-8 w-8 text-purple-500" />
					<h1 className="text-4xl text-purple-500">
						<Link href="https://kristall.app" prefetch={false}>
							Kristall
						</Link>
					</h1>
				</div>
				<div className="flex items-center gap-4">
					<Link
						href="https://dashboard.kristall.app"
						className="hover:underline"
						prefetch={false}
					>
						Dashboard
					</Link>
				</div>
			</header>
			<Separator />
			<main className="flex-1 py-10 px-6">
				{isAllDown && (
					<div className="flex items-center justify-center pb-12">
						<Image
							src="/this-is.gif"
							alt="This is fine"
							width={800}
							height={450}
						/>
					</div>
				)}
				<div className="max-w-4xl mx-auto">
					<h2 className="text-3xl font-bold mb-6">System Status</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						<Service name={dashboard.key} status={dashboard.status}>
							<ChartBar className="h-6 w-6" />
						</Service>
						<Service name={api.key} status={api.status}>
							<Server className="h-6 w-6" />
						</Service>
						<Service name={showroom.key} status={showroom.status}>
							<GalleryThumbnails className="h-6 w-6" />
						</Service>
					</div>
					<div className="mt-10">
						<h3 className="text-2xl font-bold mb-4">Incident Timeline</h3>
						<div className="space-y-6">
							<div className="grid grid-cols-[auto_1fr_auto] items-start gap-4">
								<div className="bg-muted p-2 rounded-full">
									<CalendarIcon className="h-5 w-5 text-muted-foreground" />
								</div>
								<div>
									<h4 className="text-lg font-medium">{message}</h4>
									<p className="text-sm text-muted-foreground">{description}</p>
									<div className="flex items-center gap-2 mt-2">
										<div
											className={cn(
												"h-3 w-3 rounded-full",
												{ "bg-green-500": isAllOperational },
												{ "bg-red-500": isAllDown },
												{ "bg-yellow-500": !isAllOperational && !isAllDown },
											)}
										/>
										<span
											className={cn(
												"text-sm",
												{ "text-green-500": isAllOperational },
												{ "text-red-500": isAllDown },
												{ "text-yellow-500": !isAllOperational && !isAllDown },
											)}
										>
											{status}
										</span>
										<span className="text-sm text-muted-foreground capitalize">
											{format(addDay(new Date(), 0), "MMMM DD, YYYY - HH:mm")}
										</span>
									</div>
								</div>
								<div className="bg-muted p-2 rounded-full">
									<ClockIcon className="h-5 w-5 text-muted-foreground" />
								</div>
							</div>
							<div className="grid grid-cols-[auto_1fr_auto] items-start gap-4">
								<div className="bg-muted p-2 rounded-full">
									<CalendarIcon className="h-5 w-5 text-muted-foreground" />
								</div>
								<div>
									<h4 className="text-lg font-medium">
										All services are operational
									</h4>
									<p className="text-sm text-muted-foreground">
										We are happy to announce that all services are operational.
									</p>
									<div className="flex items-center gap-2 mt-2">
										<div className="h-3 w-3 rounded-full bg-green-500" />
										<span className="text-sm text-green-500">Operational</span>
										<span className="text-sm text-muted-foreground capitalize">
											{format(addDay(new Date(), -1), "MMMM DD, YYYY")}
										</span>
									</div>
								</div>
								<div className="bg-muted p-2 rounded-full">
									<ClockIcon className="h-5 w-5 text-muted-foreground" />
								</div>
							</div>
							<div className="grid grid-cols-[auto_1fr_auto] items-start gap-4">
								<div className="bg-muted p-2 rounded-full">
									<CalendarIcon className="h-5 w-5 text-muted-foreground" />
								</div>
								<div>
									<h4 className="text-lg font-medium">
										All services are operational
									</h4>
									<p className="text-sm text-muted-foreground">
										We are happy to announce that all services are operational.
									</p>
									<div className="flex items-center gap-2 mt-2">
										<div className="h-3 w-3 rounded-full bg-green-500" />
										<span className="text-sm text-green-500">Operational</span>
										<span className="text-sm text-muted-foreground capitalize">
											{format(addDay(new Date(), -2), "MMMM DD, YYYY")}
										</span>
									</div>
								</div>
								<div className="bg-muted p-2 rounded-full">
									<ClockIcon className="h-5 w-5 text-muted-foreground" />
								</div>
							</div>
							<div className="grid grid-cols-[auto_1fr_auto] items-start gap-4">
								<div className="bg-muted p-2 rounded-full">
									<CalendarIcon className="h-5 w-5 text-muted-foreground" />
								</div>
								<div>
									<h4 className="text-lg font-medium">
										All services are operational
									</h4>
									<p className="text-sm text-muted-foreground">
										We are happy to announce that all services are operational.
									</p>
									<div className="flex items-center gap-2 mt-2">
										<div className="h-3 w-3 rounded-full bg-green-500" />
										<span className="text-sm text-green-500">Operational</span>
										<span className="text-sm text-muted-foreground capitalize">
											{format(addDay(new Date(), -3), "MMMM DD, YYYY")}
										</span>
									</div>
								</div>
								<div className="bg-muted p-2 rounded-full">
									<ClockIcon className="h-5 w-5 text-muted-foreground" />
								</div>
							</div>
							<div className="grid grid-cols-[auto_1fr_auto] items-start gap-4">
								<div className="bg-muted p-2 rounded-full">
									<CalendarIcon className="h-5 w-5 text-muted-foreground" />
								</div>
								<div>
									<h4 className="text-lg font-medium">
										All services are operational
									</h4>
									<p className="text-sm text-muted-foreground">
										We are happy to announce that all services are operational.
									</p>
									<div className="flex items-center gap-2 mt-2">
										<div className="h-3 w-3 rounded-full bg-green-500" />
										<span className="text-sm text-green-500">Operational</span>
										<span className="text-sm text-muted-foreground capitalize">
											{format(addDay(new Date(), -4), "MMMM DD, YYYY")}
										</span>
									</div>
								</div>
								<div className="bg-muted p-2 rounded-full">
									<ClockIcon className="h-5 w-5 text-muted-foreground" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
