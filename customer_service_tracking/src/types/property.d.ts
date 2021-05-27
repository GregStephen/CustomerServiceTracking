declare namespace Property {
  export interface Property {
    id: string;
    displayName: string;
    enabled: boolean;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: string;
    latitude: string;
    longitude: string;
    systems: PropertySystem[];
    contacts: Contact[];
    businessId: string;
  }

  export interface PropertySystem {
    id: string;
    propertyId: string;
    installDate: string;
    displayName: string;
    enabled: boolean;
    notes?: string;
    nozzles: number;
    serialNumber: string;
    sold: boolean;
    sprayCycles: number;
    sprayDuration: number;
    nextServiceDate: number;
    serviceOptionId: number;
    systemId: string;
    systemInfo?: Business.BusinessSystem;
  }

  export interface Contact {
    id: string;
    firstName: string;
    lastName: string;
    primary: boolean;
    homePhone?: string;
    cellPhone?: string;
    workPhone?: string;
    email?: string;
    propertyId: string;
  }

  export interface Report {
    id: string;
    amountRemaining: number;
    propertyId: string;
    inchesAdded: number;
    notes: string;
    serviceDate: string;
    solutionAdded: number;
    systemId: string;
    technicianId: string;
    jobTypeId: string;
    systemName?: string;
    technician: string;
    type: string;
    property?: Property.Property;
  }
}