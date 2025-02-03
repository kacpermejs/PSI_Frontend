
export interface CreateOrderResponse{
  orderId:number;
  paymentId: number;
  username:string;
  orderNumber: string;
  orderState: string;
  finalPrice: number;
  createdAt: string;
}
