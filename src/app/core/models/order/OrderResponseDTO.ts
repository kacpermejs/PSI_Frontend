export interface OrderResponseDTO {
  createdAt: string;
  finalPrice: number;
  orderId: number;
  orderNumber: string;
  payment?: string;
  state: string; //FIXME
  username: string;
}