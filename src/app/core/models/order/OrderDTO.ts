import { OrderTicketDTO } from "./OrderTicketDTO";


export interface OrderDTO {
  tickets: OrderTicketDTO[];
  username: string;
}
