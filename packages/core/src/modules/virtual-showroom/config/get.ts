"use server";

import { GET } from "@kristall/http";
import { VIRTUAL_SHOWROOM_TAGS } from "../constants/virtual-showroom.tags";
import type { VirtualShowroomConfig } from "../interfaces";

export const getVirtualShowroomConfig =
  async (): Promise<VirtualShowroomConfig | null> => {
    const { data, message, status } = await GET<VirtualShowroomConfig | null>(
      "/virtual-showroom/config",
      {
        tags: [VIRTUAL_SHOWROOM_TAGS.CONFIG],
        cache: "force-cache",
      }
    );

    return data;
  };
