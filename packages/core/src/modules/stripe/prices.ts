"use server";

import type Stripe from "stripe";

import { GET } from "@kristall/http";

import { type OrderBy, orderStripePrices } from "./adapters/prices";
import { STRIPE_TAGS } from "./constants/tags";

interface GetStripePricesOptions {
  orderBy?: OrderBy;
}

/**
 * Get all active prices from Stripe API
 *
 * @param {GetStripePricesOptions} options
 * @returns {Promise<Stripe.Price[]>}
 */
export const getStripePrices = async (
  options?: GetStripePricesOptions
): Promise<Stripe.Price[]> => {
  const { data, message, status } = await GET<Stripe.Price[] | null>(
    "/stripe/prices",
    {
      tags: [STRIPE_TAGS.PRICES],
      auth: false,
    }
  );

  if (!data) return [];

  if (options?.orderBy) {
    return orderStripePrices(data, options.orderBy);
  }

  return data;
};

export const getPlanByPriceId = async (priceId: string) => {
  const { data } = await GET<Stripe.Price | null>(`/stripe/price/${priceId}`, {
    tags: [`${STRIPE_TAGS.PRICES}:${priceId}`],
  });

  return data;
};
