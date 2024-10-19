import type { ServerResponse } from "@/core/modules/http/interfaces";
import type {
	DefaultBatch,
	DefaultPOSAccess,
	UseExperimentalFeatures,
} from "../interfaces";

import { NEXT_TAGS } from "@/constants/tags";
import { GET, PATCH, POST } from "@/core/modules/http";

export const getDefaultBatchEnabledService = async (): Promise<
	ServerResponse<DefaultBatch>
> => {
	return await GET<DefaultBatch>("/settings/default-batches", {
		tags: [NEXT_TAGS.GET_DEFAULT_BATCH],
	});
};

export const getDefaultPOSAccessService = async (): Promise<
	ServerResponse<DefaultPOSAccess>
> => {
	return await GET<DefaultPOSAccess>("/settings/default-pos-access", {
		tags: [NEXT_TAGS.GET_DEFAULT_POS_ACCESS],
	});
};

export const getUseExperimentalFeaturesService = async (): Promise<
	ServerResponse<UseExperimentalFeatures>
> => {
	return await GET<UseExperimentalFeatures>("/settings/experimental-features", {
		tags: [NEXT_TAGS.GET_USE_EXPERIMENTAL_FEATURES],
	});
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
