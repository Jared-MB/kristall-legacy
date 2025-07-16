"use server";

import { VERSIONS, type Version } from "@kristall/shared/versions";
import { canUseExperimentalFeatures } from "../services/store-management/use-cases/private/can-use-experimental-features";

export const getLastVersion = async (): Promise<Version> => {
	const hasExperimentalFeatures = await canUseExperimentalFeatures();

	if (hasExperimentalFeatures) {
		return VERSIONS[0] as Version;
	}

	const lastStableVersion = VERSIONS.find((v) => !v._id.includes("RC"));
	return (lastStableVersion as Version) ?? VERSIONS[0];
};

export const isFeatureEnabled = async (
	AVAILABLE_SINCE: string,
	AVAILABLE_SINCE_MINOR: number,
) => {
	const version = (await getLastVersion())._id;
	const mayorVersion = version.split(".")[0];
	const minorVersion = Number(version.split(".")[1]);

	let enabled = false;
	if (
		version.includes(AVAILABLE_SINCE) ||
		minorVersion >= AVAILABLE_SINCE_MINOR ||
		mayorVersion === "v1"
	) {
		enabled = true;
	}

	return enabled;
};
