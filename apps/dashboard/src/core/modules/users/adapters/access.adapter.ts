"use server";

import { NEXT_TAGS } from "@/constants/tags";
import { revalidateTag } from "next/cache";
import type { Permission } from "../interfaces";
import {
	getUserAccessService,
	getUserPOSAccessService,
	updateUserAccessService,
	updateUserPOSAccessService,
} from "../services";

export const getDashboardAccess = async (_id: string): Promise<boolean> => {
	const query = new URLSearchParams({
		_id,
	}).toString();

	const { data } = await getUserAccessService(query);
	if (data === "all" || data.includes("dashboard:access;")) {
		return true;
	}
	return false;
};

export const getDashboardSpecificAccess = async (
	_id: string,
): Promise<Permission[]> => {
	const query = new URLSearchParams({
		_id,
	}).toString();
	const { data } = await getUserAccessService(query);
	const permissions = data.split(";") as Permission[];
	return permissions;
};

export const getPOSAccess = async (_id: string): Promise<boolean> => {
	const query = new URLSearchParams({
		_id,
	}).toString();
	const { data } = await getUserPOSAccessService(query);
	return data;
};

export const updatePOSAccess = async (_id: string) => {
	const query = new URLSearchParams({
		_id,
	}).toString();
	await updateUserPOSAccessService(query);
	revalidateTag(NEXT_TAGS.GET_POS_ACCESS);
};

export const updateDashboardAccess = async (
	_id: string,
	hasAccess: boolean,
): Promise<void> => {
	const permission = !hasAccess ? "dashboard:access;" : "dashboard:deny;";
	await updateUserAccessService(_id, permission);
	revalidateTag(NEXT_TAGS.GET_DASHBOARD_ACCESS);
};

export const updateDashboardSpecificAccess = async (
	_id: string,
	payload: FormData,
) => {
	const permissions = Object.keys(Object.fromEntries(payload))
		.join(";")
		.concat(";")
		.replaceAll("-", ":");
	await updateUserAccessService(_id, permissions);
	revalidateTag(NEXT_TAGS.GET_DASHBOARD_ACCESS);
};
