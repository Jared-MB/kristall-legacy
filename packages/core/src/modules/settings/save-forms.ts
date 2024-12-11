"use server";

import type { SaveForms } from "./interfaces";

import { revalidateTag } from "next/cache";
import { SETTINGS_TAGS } from "./constants";
import {
	getSaveFormsService,
	updateSaveFormsService,
} from "./services/save-forms";

export const getSaveFormsConfig = async (): Promise<SaveForms> => {
	const { data } = await getSaveFormsService();
	if (!data) {
		return {
			saveForms: false,
		};
	}
	return data;
};

export const updateSaveForms = async (): Promise<void> => {
	await updateSaveFormsService();
	revalidateTag(SETTINGS_TAGS.SAVE_FORMS);
};
