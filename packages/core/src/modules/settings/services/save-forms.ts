"use server";

import type { ServerResponse } from "@kristall/http/interfaces";
import type { SaveForms } from "../interfaces";

import { GET, PATCH } from "@kristall/http";
import { SETTINGS_TAGS } from "../constants";

export const getSaveFormsService = async (): Promise<
	ServerResponse<SaveForms>
> => {
	return await GET<SaveForms>("/settings/save-forms", {
		tags: [SETTINGS_TAGS.SAVE_FORMS],
	});
};

export const updateSaveFormsService = async (): Promise<
	ServerResponse<SaveForms>
> => {
	return await PATCH<any, SaveForms>("/settings/save-forms", {});
};
