// DTO for a response returned from backend when using /makepayment endpoint
export interface MakePaymentResponse{
  orderId: number;

  orderNumber: string;

  state: string;

  finalPrice: number;
}
