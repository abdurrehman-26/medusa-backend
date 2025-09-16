export interface StripeOptions {
  /**
   * The API key for the Stripe account
   */
  apiKey: string
  /**
   * The webhook secret used to verify webhooks
   */
  webhookSecret: string
  /**
   * Use this flag to capture payment immediately (default is false)
   */
  capture?: boolean
  /**
   * set `automatic_payment_methods` on the intent request to `{ enabled: true }`
   */
  automaticPaymentMethods?: boolean
  /**
   * Set a default description on the intent if the context does not provide one
   */
  paymentDescription?: string
}