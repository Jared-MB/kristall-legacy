"use server";

import { NEXT_TAGS } from "@/constants/tags";
import { revalidateTag } from "next/cache";
import type {
	DefaultBatch,
	DefaultPOSAccess,
	UseExperimentalFeatures,
} from "../interfaces";
import {
	getDefaultBatchEnabledService,
	getDefaultPOSAccessService,
	getUseExperimentalFeaturesService,
	updateDefaultBatchEnabledService,
	updateDefaultPOSAccessService,
	updateUseExperimentalFeaturesService,
} from "../services";

export const getDefaultBatchEnabled = async (): Promise<DefaultBatch> => {
	const { data } = await getDefaultBatchEnabledService();
	return data;
};

export const getDefaultPOSAccessEnabled =
	async (): Promise<DefaultPOSAccess> => {
		const { data } = await getDefaultPOSAccessService();
		return data;
	};

export const getUseExperimentalFeatures =
	async (): Promise<UseExperimentalFeatures> => {
		const { data } = await getUseExperimentalFeaturesService();
		return data;
	};

export const updateUseExperimentalFeatures = async (): Promise<void> => {
	await updateUseExperimentalFeaturesService();
	revalidateTag(NEXT_TAGS.GET_USE_EXPERIMENTAL_FEATURES);
};

export const updateDefaultBatchEnabled = async (): Promise<void> => {
	await updateDefaultBatchEnabledService();
	revalidateTag(NEXT_TAGS.GET_DEFAULT_BATCH);
};

export const updateDefaultPOSAccessEnabled = async (): Promise<void> => {
	await updateDefaultPOSAccessService();
	revalidateTag(NEXT_TAGS.GET_DEFAULT_POS_ACCESS);
};
