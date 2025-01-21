import { EventFacility } from "./EventFacility";


export class Venue {
  id: number;
  name: string;
  eventFacility: EventFacility;

  constructor(id: number, name: string, eventFacility: EventFacility) {
    this.id = id;
    this.name = name;
    this.eventFacility = eventFacility;
  }
}
