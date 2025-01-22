import { Venue } from "./Venue";


export class VenueSchematicDTO {
  id: number;
  name: string;
  venue: Venue;

  constructor(id: number, name: string, venue: Venue) {
    this.id = id;
    this.name = name;
    this.venue = venue;
  }
}
