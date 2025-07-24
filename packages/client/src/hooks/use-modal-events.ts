import { useCallback } from "react";

declare global {
	interface DocumentEventMap {
		openAddModal: CustomEvent<void>;
	}
}

export function useModalEvents() {
	const openAddModal = useCallback(() => {
		const event = new CustomEvent("openAddModal");
		document.dispatchEvent(event);
	}, []);

	return {
		openAddModal,
	};
}
