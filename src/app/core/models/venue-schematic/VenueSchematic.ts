import { SchematicObject } from "./SchematicObject";

export interface VenueSchematic {
  id: number;
  name: string;
  schematicObjects: SchematicObject[];
}
