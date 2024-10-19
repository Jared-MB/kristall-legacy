import Divider from "@/components/divider";
import Header from "@/components/header";
import NavLink from "@/components/nav-link";
import { Button } from "@/components/ui";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import VERSIONS from "@/constants/versions";
import { CircleHelp, Logs } from "lucide-react";
import Link from "next/link";

export default function DocsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="grid grid-rows-[auto_1fr] h-dvh">
			<div className="grid grid-cols-1 lg:grid-cols-[20dvw_1fr] xl:grid-cols-[15dvw_1fr]">
				<h1 className="text-4xl text-purple-500 grid place-content-center h-16 border-b border-b-zinc-700 border-r border-r-zinc-700">
					Kristall
				</h1>
				<Header
					endContent={
						<Button asChild variant="link">
							<Link href="/dashboard">Ir al dashboard</Link>
						</Button>
					}
				>
					Documentación
				</Header>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-[20dvw_1fr] xl:grid-cols-[15dvw_1fr] h-full">
				<aside className="border-r border-r-zinc-700 flex flex-col gap-y-4 px-6 py-4 h-full">
					<nav>
						<NavLink href="/docs/faq" icon={<CircleHelp />}>
							FAQ
						</NavLink>
					</nav>
					<Divider />
					<nav>
						<Accordion type="single" collapsible>
							<AccordionItem value="versiones" className="border-none">
								<AccordionTrigger
									variant="child"
									className="hover:no-underline"
								>
									<NavLink href="/docs/change-log" icon={<Logs />}>
										Versiones
									</NavLink>
								</AccordionTrigger>
								<AccordionContent>
									<ul className="flex flex-col gap-y-1 pl-4 py-2">
										{VERSIONS.map((v) => (
											<li
												key={v._id}
												className="list-disc text-zinc-400 hover:text-purple-500"
											>
												<Link href={`/docs/change-log#${v._id}`}>{v._id}</Link>
											</li>
										))}
									</ul>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</nav>
				</aside>
				{children}
			</div>
		</div>
	);
}
