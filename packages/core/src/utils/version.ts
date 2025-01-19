"use server";

import { VERSIONS } from "../constants";
import { getUseExperimentalFeatures } from "../modules/settings/adapters/settings.adapter";

export const getLastVersion = async () => {
	const { useExperimentalFeatures } = await getUseExperimentalFeatures();

	const lastVersion = VERSIONS[0]._id;
	if (!lastVersion.includes("RC")) {
		return VERSIONS[0];
	}

	if (useExperimentalFeatures) {
		return VERSIONS[0];
	}

	return VERSIONS.find((v) => !v._id.includes("RC")) ?? VERSIONS[0];
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
