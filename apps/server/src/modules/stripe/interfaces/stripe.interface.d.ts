import type Stripe from 'stripe';

export type StripeUserSubscription = {
    subscriptionId: string;
    status: Stripe.Subscription.Status;
    priceId: string;
    currentPeriodEnd: number;
    currentPeriodStart: number;
    cancelAtPeriodEnd: boolean;
    paymentMethod: {
        brand?: string | null,
        last4?: string | null
    } | null;
} | {
    status: 'none'
}