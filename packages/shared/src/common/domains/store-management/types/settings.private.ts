import type { UUID } from "node:crypto";

export interface PrivateSettings {
	_id: UUID;
	defaultBatchEnabled: boolean;
	defaultPOSAccessEnabled: boolean;
	useExperimentalFeatures: boolean;
	enableBankAccounts: boolean;
	removeBankAccounts: boolean;
	saveForms: boolean;
}
