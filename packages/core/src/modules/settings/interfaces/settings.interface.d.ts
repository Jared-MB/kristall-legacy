import type { UUID } from "node:crypto";

export interface Settings {
	_id: UUID;
	defaultBatchEnabled: boolean;
	defaultPOSAccessEnabled: boolean;
	useExperimentalFeatures: boolean;
	enableBankAccounts: boolean;
	removeBankAccounts: boolean;
}

export type DefaultBatch = Pick<Settings, "defaultBatchEnabled">;
export type DefaultPOSAccess = Pick<Settings, "defaultPOSAccessEnabled">;
export type UseExperimentalFeatures = Pick<Settings, "useExperimentalFeatures">;
export type EnableBankAccounts = Pick<Settings, "enableBankAccounts">;
export type RemoveBankAccounts = Pick<Settings, "removeBankAccounts">;
