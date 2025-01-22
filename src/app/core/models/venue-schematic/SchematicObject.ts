import { SchematicMetadata } from "./Metadata";

export interface SchematicObject {
  id: number;
  name: string;
  label: string;
  showLabel: boolean;
  x: number;
  y: number;
  angle: number;
  layer: number;
  children: SchematicObject[];
  metadata: SchematicMetadata[];
}
