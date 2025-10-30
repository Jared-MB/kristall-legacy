"use server";

import { GET } from "@kristall/nexum";
import { STATUS } from "@kristall/nexum/status";
import type { Session } from "@kristall/shared/domains/auth/types/session.private";

import { AUTH_PRIVATE_ENDPOINTS } from "@kristall/shared/infrastructure/api/endpoints/auth/private";
import { redirect } from "next/navigation";
import { cache } from "react";

export const verifySession = cache(async () => {
  const { data, status } = await GET<Session>(
    AUTH_PRIVATE_ENDPOINTS.VERIFY_SESSION,
    {
      cache: "no-store",
    }
  );

  if (!data || status !== STATUS.OK) {
    redirect("/login");
  }

  return data;
});
