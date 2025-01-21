import { VenueSchematic } from "./VenueSchematic";

export interface EventDetails {
  id: number;
  title: string;
  description: string;
  location: string;
  status: string;
  saleStartDate: string; // Use `Date` if you want strict typing for dates
  eventStartDate: string;
  saleEndDate: string;
  venueSchematic: VenueSchematic;

}