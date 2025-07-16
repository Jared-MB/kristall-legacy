"use server";

import { GET } from "@kristall/nexum";

import type { PrivateSettings } from "@kristall/shared/domains/store-management/types/settings.private";
import { SETTINGS_TAGS } from "../../constants/tags/settings";

export const canUseExperimentalFeatures = async (): Promise<boolean> => {
	const { data } = await GET<Pick<PrivateSettings, "useExperimentalFeatures">>(
		"/settings/experimental-features",
		{
			tags: [SETTINGS_TAGS.USE_EXPERIMENTAL_FEATURES],
		},
	);

	if (!data) return false;

	return data.useExperimentalFeatures;
};
