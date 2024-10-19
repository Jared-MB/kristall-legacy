"use client";

import { CardBody, CardSubtitle } from "@/components/ui";
import { useBatchesContext } from "../../context/batch-context";
import AddBatch from "./add-batch";
import Batch from "./batch";

export default function Batches() {
	const { batches, isEnabled } = useBatchesContext();

	if (!isEnabled) {
		return null;
	}

	return (
		<CardBody className="flex flex-col gap-y-4">
			<header className="flex flex-row justify-between items-center">
				<CardSubtitle>
					Lotes <small className="text-sm text-zinc-400">(beta)</small>
				</CardSubtitle>
				<AddBatch />
			</header>
			<div className="flex flex-col gap-y-2">
				{batches.map((batch, index) => (
					<Batch key={batch.batchNumber} batch={batch} index={index + 1} />
				))}
			</div>
		</CardBody>
	);
}
