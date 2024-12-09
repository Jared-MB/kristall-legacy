"use server";

import type { ServerResponse } from "@kristall/http/interfaces";
import type {
	DefaultBatch,
	DefaultPOSAccess,
	SaveForms,
	UseExperimentalFeatures,
} from "../interfaces";

import { GET, PATCH, POST } from "@kristall/http";

import { SETTINGS_TAGS } from "../constants";

export const getSaveFormsService = async (): Promise<
	ServerResponse<SaveForms>
> => {
	return await GET<SaveForms>("/settings/save-forms", {
		tags: [SETTINGS_TAGS.SAVE_FORMS],
	});
};

export const getDefaultBatchEnabledService = async (): Promise<
	ServerResponse<DefaultBatch>
> => {
	return await GET<DefaultBatch>("/settings/default-batches", {
		tags: [SETTINGS_TAGS.DEFAULT_BATCH],
	});
};

export const getDefaultPOSAccessService = async (): Promise<
	ServerResponse<DefaultPOSAccess>
> => {
	return await GET<DefaultPOSAccess>("/settings/default-pos-access", {
		tags: [SETTINGS_TAGS.DEFAULT_POS_ACCESS],
	});
};

export const getUseExperimentalFeaturesService = async (): Promise<
	ServerResponse<UseExperimentalFeatures>
> => {
	return await GET<UseExperimentalFeatures>("/settings/experimental-features", {
		tags: [SETTINGS_TAGS.USE_EXPERIMENTAL_FEATURES],
	});
};

export const updateSaveFormsService = async (): Promise<
	ServerResponse<SaveForms>
> => {
	return await PATCH<any, SaveForms>("/settings/save-forms", {});
};

export const updateUseExperimentalFeaturesService = async (): Promise<
	ServerResponse<UseExperimentalFeatures>
> => {
	return await PATCH<any, UseExperimentalFeatures>(
		"/settings/experimental-features",
		{},
	);
};

export const updateDefaultPOSAccessService = async (): Promise<
	ServerResponse<DefaultPOSAccess>
> => {
	return await POST<any, DefaultPOSAccess>(
		"/settings/toggle-default-pos-access",
		{},
	);
};

export const updateDefaultBatchEnabledService = async (): Promise<
	ServerResponse<DefaultBatch>
> => {
	return await POST<any, DefaultBatch>("/settings/toggle-default-batches", {});
};
