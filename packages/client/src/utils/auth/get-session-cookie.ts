"use server";

import { getCookie } from "../cookies";
import { AvailableCookies } from "../cookies/available";

export async function getSessionCookie() {
  const sessionCookie = await getCookie(AvailableCookies.SESSION);
  return sessionCookie;
}
