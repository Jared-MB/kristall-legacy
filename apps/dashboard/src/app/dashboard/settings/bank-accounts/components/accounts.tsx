import Divider from "@/components/divider";
import { Button, Card, CardBody } from "@/components/ui";
import { bankAccount } from "@/core/modules/bank-account";
import { MoreVertical, Wallet } from "lucide-react";
import { Fragment } from "react";

export default async function Accounts() {
	const bankAccounts = await bankAccount.getSafeBankAccounts();

	if (bankAccounts.length === 0) return null;

	return (
		<Card>
			<CardBody className="p-0 gap-y-0">
				{bankAccounts.map(({ _id, bank, accountNumber }, index) => (
					<Fragment key={_id}>
						<div className="flex flex-row justify-between gap-x-2 items-center p-4">
							<div className="flex flex-row gap-x-4 items-center">
								<div className="rounded-full p-2 ring-2 ring-zinc-300">
									<Wallet className="w-6 h-6" />
								</div>
								<h5>{bank}</h5>
							</div>
							<span>{accountNumber}</span>
							<Button variant="ghost" size="icon">
								<MoreVertical />
							</Button>
						</div>
						{index !== bankAccounts.length - 1 && <Divider />}
					</Fragment>
				))}
			</CardBody>
		</Card>
	);
}
