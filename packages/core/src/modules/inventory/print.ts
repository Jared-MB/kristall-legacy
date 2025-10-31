"use server";

import { GET } from "@kristall/nexum";
import { printInventoryAdapter } from "./adapters/print";
import type { PrintProduct } from "./interfaces";

export const printInventory = async (
  location: string
): Promise<PrintProduct[] | null> => {
  const data = await GET<PrintProduct[] | null>(
    `/inventory/print?location=${location}`
  );
  return printInventoryAdapter(data);
};
