"use server";

import type {
	DefaultBatch,
	DefaultPOSAccess,
	SaveForms,
	UseExperimentalFeatures,
} from "../interfaces";

import { revalidateTag } from "next/cache";

import { SETTINGS_TAGS } from "../constants";
import { settingsService } from "../services";

export const getSaveForms = async (): Promise<SaveForms> => {
	const { data } = await settingsService.getSaveFormsService();
	if (!data) {
		return {
			saveForms: false,
		};
	}
	return data;
};

export const getDefaultBatchEnabled = async (): Promise<DefaultBatch> => {
	const { data } = await settingsService.getDefaultBatchEnabledService();
	if (!data) {
		return {
			defaultBatchEnabled: false,
		};
	}
	return data;
};

export const getDefaultPOSAccessEnabled =
	async (): Promise<DefaultPOSAccess> => {
		const { data } = await settingsService.getDefaultPOSAccessService();
		if (!data) {
			return {
				defaultPOSAccessEnabled: false,
			};
		}
		return data;
	};

export const getUseExperimentalFeatures =
	async (): Promise<UseExperimentalFeatures> => {
		const { data } = await settingsService.getUseExperimentalFeaturesService();
		if (!data) {
			return {
				useExperimentalFeatures: false,
			};
		}
		return data;
	};

export const updateSaveForms = async (): Promise<void> => {
	await settingsService.updateSaveFormsService();
	revalidateTag(SETTINGS_TAGS.SAVE_FORMS);
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
