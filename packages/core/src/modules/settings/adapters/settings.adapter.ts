"use server";

import type {
	DefaultBatch,
	DefaultPOSAccess,
	UseExperimentalFeatures,
} from "../interfaces";

import { revalidateTag } from "next/cache";

import { SETTINGS_TAGS } from "../constants";
import { settingsService } from "../services";

export const getDefaultBatchEnabled = async (): Promise<DefaultBatch> => {
	const { data } = await settingsService.getDefaultBatchEnabledService();
	return data;
};

export const getDefaultPOSAccessEnabled =
	async (): Promise<DefaultPOSAccess> => {
		const { data } = await settingsService.getDefaultPOSAccessService();
		return data;
	};

export const getUseExperimentalFeatures =
	async (): Promise<UseExperimentalFeatures> => {
		const { data } = await settingsService.getUseExperimentalFeaturesService();
		return data;
	};

export const updateUseExperimentalFeatures = async (): Promise<void> => {
	await settingsService.updateUseExperimentalFeaturesService();
	revalidateTag(SETTINGS_TAGS.USE_EXPERIMENTAL_FEATURES);
};

export const updateDefaultBatchEnabled = async (): Promise<void> => {
	await settingsService.updateDefaultBatchEnabledService();
	revalidateTag(SETTINGS_TAGS.DEFAULT_BATCH);
};

export const updateDefaultPOSAccessEnabled = async (): Promise<void> => {
	await settingsService.updateDefaultPOSAccessService();
	revalidateTag(SETTINGS_TAGS.DEFAULT_POS_ACCESS);
};
