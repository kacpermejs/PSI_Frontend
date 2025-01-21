
export class Address {
  id: number;
  city: string;
  addressLine1: string;
  addressLine2: string | null;
  country: string;
  postalCode: string;
  stateOrRegion: string;

  constructor(
    id: number,
    city: string,
    addressLine1: string,
    addressLine2: string | null,
    country: string,
    postalCode: string,
    stateOrRegion: string
  ) {
    this.id = id;
    this.city = city;
    this.addressLine1 = addressLine1;
    this.addressLine2 = addressLine2;
    this.country = country;
    this.postalCode = postalCode;
    this.stateOrRegion = stateOrRegion;
  }
}
