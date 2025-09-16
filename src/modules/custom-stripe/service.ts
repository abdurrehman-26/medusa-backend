import Stripe from "stripe"
import { AbstractPaymentProvider, isDefined, PaymentSessionStatus } from "@medusajs/framework/utils"
import { 
  AuthorizePaymentInput,
  AuthorizePaymentOutput,
  CancelPaymentInput,
  CancelPaymentOutput,
  CapturePaymentInput,
  CapturePaymentOutput, 
  DeletePaymentInput,
  DeletePaymentOutput,
  GetPaymentStatusInput,
  GetPaymentStatusOutput,
  InitiatePaymentInput,
  InitiatePaymentOutput,
  Logger,
  ProviderWebhookPayload,
  RefundPaymentInput,
  RefundPaymentOutput,
  RetrievePaymentInput,
  RetrievePaymentOutput,
  UpdatePaymentInput,
  UpdatePaymentOutput,
  WebhookActionResult 
} from "@medusajs/framework/types"
import { StripeOptions } from "./types"


type InjectedDependencies = {
  logger: Logger
}

class CustomStripeService extends AbstractPaymentProvider<StripeOptions> {
  static identifier = "my_stripe"
  protected readonly options_: StripeOptions
  protected stripe_: Stripe
  protected logger_: Logger

  constructor(
    container: InjectedDependencies,
    options: StripeOptions
  ) {
    super(container, options)

    this.logger_ = container.logger
    this.options_ = options

    this.stripe_ = new Stripe(options.apiKey)
  }
  static validateOptions(options: StripeOptions): void {
    if (!isDefined(options.apiKey)) {
      throw new Error("Required option `apiKey` is missing in Stripe plugin")
    }
  }
  capturePayment(input: CapturePaymentInput): Promise<CapturePaymentOutput> {
    throw new Error("Method not implemented.")
  }
  authorizePayment(input: AuthorizePaymentInput): Promise<AuthorizePaymentOutput> {
    throw new Error("Method not implemented.")
  }
  cancelPayment(input: CancelPaymentInput): Promise<CancelPaymentOutput> {
    throw new Error("Method not implemented.")
  }
  async initiatePayment({
    context,
  }: InitiatePaymentInput): Promise<InitiatePaymentOutput> {

    const intentRequest: Stripe.Checkout.SessionCreateParams = {
      line_items: [
      {
        // Provide the exact Price ID (for example, price_1234) of the product you want to sell
        price: '{{PRICE_ID}}',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `http://localhost:3000/order/success`,
    cancel_url: `http://localhost:3000/order/cancel`,
    }

    intentRequest.customer = context?.account_holder?.data?.id as
      | string
      | undefined

    const sessionData = await this.stripe_.checkout.sessions.create(intentRequest, {
      idempotencyKey: context?.idempotency_key,
    })
    return {
      id: sessionData.id,
      data: {
        checkout_url: sessionData.url
      },
      status: "pending"
    }
  }
  deletePayment(input: DeletePaymentInput): Promise<DeletePaymentOutput> {
    throw new Error("Method not implemented.")
  }
  getPaymentStatus(input: GetPaymentStatusInput): Promise<GetPaymentStatusOutput> {
    throw new Error("Method not implemented.")
  }
  refundPayment(input: RefundPaymentInput): Promise<RefundPaymentOutput> {
    throw new Error("Method not implemented.")
  }
  retrievePayment(input: RetrievePaymentInput): Promise<RetrievePaymentOutput> {
    throw new Error("Method not implemented.")
  }
  updatePayment(input: UpdatePaymentInput): Promise<UpdatePaymentOutput> {
    throw new Error("Method not implemented.")
  }
  getWebhookActionAndData(data: ProviderWebhookPayload["payload"]): Promise<WebhookActionResult> {
    throw new Error("Method not implemented.")
  }
}

export default CustomStripeService