import type Stripe from "stripe";

export interface StripeSession {
	id: string;
	object: string;
	after_expiration: null;
	allow_promotion_codes: null;
	amount_subtotal: number;
	amount_total: number;
	automatic_tax: AutomaticTax;
	billing_address_collection: null;
	cancel_url: string;
	client_reference_id: null;
	client_secret: null;
	consent: null;
	consent_collection: null;
	created: number;
	currency: string;
	currency_conversion: null;
	custom_fields: any[];
	custom_text: CustomText;
	customer: string;
	customer_creation: string;
	customer_details: CustomerDetails;
	customer_email: null;
	expires_at: number;
	invoice: string;
	invoice_creation: null;
	livemode: boolean;
	locale: null;
	metadata: Metadata;
	mode: string;
	payment_intent: null;
	payment_link: null;
	payment_method_collection: string;
	payment_method_configuration_details: null;
	payment_method_options: PaymentMethodOptions;
	payment_method_types: string[];
	payment_status: string;
	phone_number_collection: PhoneNumberCollection;
	recovered_from: null;
	saved_payment_method_options: SavedPaymentMethodOptions;
	setup_intent: null;
	shipping_address_collection: null;
	shipping_cost: null;
	shipping_details: null;
	shipping_options: any[];
	status: string;
	submit_type: null;
	subscription: string;
	success_url: string;
	total_details: TotalDetails;
	ui_mode: string;
	url: null;
}

export interface AutomaticTax {
	enabled: boolean;
	liability: null;
	status: null;
}

export interface CustomText {
	after_submit: null;
	shipping_address: null;
	submit: null;
	terms_of_service_acceptance: null;
}

export interface CustomerDetails {
	address: Address;
	email: string;
	name: string;
	phone: null;
	tax_exempt: string;
	tax_ids: any[];
}

export interface Address {
	city: null;
	country: string;
	line1: null;
	line2: null;
	postal_code: null;
	state: null;
}

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export type Metadata = {};

export interface PaymentMethodOptions {
	card: Card;
}

export interface Card {
	request_three_d_secure: string;
}

export interface PhoneNumberCollection {
	enabled: boolean;
}

export interface SavedPaymentMethodOptions {
	allow_redisplay_filters: string[];
	payment_method_remove: null;
	payment_method_save: null;
}

export interface TotalDetails {
	amount_discount: number;
	amount_shipping: number;
	amount_tax: number;
}

/**
 * @deprecated Use StripeUserSubscription instead
 */
export interface StripePlan {
	id: string;
	object: string;
	active: boolean;
	aggregate_usage: null;
	amount: number;
	amount_decimal: string;
	billing_scheme: string;
	created: number;
	currency: string;
	interval: string;
	interval_count: number;
	livemode: boolean;
	metadata: Metadata;
	meter: null;
	nickname: string;
	product: string;
	tiers_mode: null;
	transform_usage: null;
	trial_period_days: null;
	usage_type: string;
	current_period_end: Date;
	cancel_at_period_end: boolean;
}

export type StripeUserSubscription =
	| {
			subscriptionId: string;
			status: Stripe.Subscription.Status;
			priceId: string;
			currentPeriodEnd: number;
			currentPeriodStart: number;
			cancelAtPeriodEnd: boolean;
			paymentMethod: {
				brand?: string | null;
				last4?: string | null;
			} | null;
	  }
	| {
			status: "none";
	  };
