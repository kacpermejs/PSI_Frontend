
export interface SchematicMetadata {
  type: string;
}

export interface SeatMetadata extends SchematicMetadata {
  type: string;
  id: number;
  label: string;
  name: string | null;
  seatType: string;
  row: string;
  column: string;
  capacity: number;
}

export interface TicketMetadata extends SchematicMetadata {
  type: string;
  id: number;
  available: boolean;
  price: number;
}
