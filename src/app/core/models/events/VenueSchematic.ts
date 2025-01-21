import { Venue } from "./Venue";


export class VenueSchematic {
  id: number;
  name: string;
  venue: Venue;
  schematicObjects: any | null; // Adjust type if schematicObjects have a specific structure

  constructor(id: number, name: string, venue: Venue, schematicObjects: any | null) {
    this.id = id;
    this.name = name;
    this.venue = venue;
    this.schematicObjects = schematicObjects;
  }
}
