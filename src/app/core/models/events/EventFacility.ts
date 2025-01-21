import { Address } from "./Address";


export class EventFacility {
  id: number;
  name: string;
  address: Address;

  constructor(id: number, name: string, address: Address) {
    this.id = id;
    this.name = name;
    this.address = address;
  }
}
