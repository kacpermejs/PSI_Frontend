import { SeatMetadata, SectionMetadata, TicketMetadata } from "../venue-schematic/Metadata";

export interface OrderData {
  ticket: TicketMetadata;
  seat?: SeatMetadata;
  section?: SectionMetadata;
}