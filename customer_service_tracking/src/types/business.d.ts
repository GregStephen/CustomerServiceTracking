declare namespace Business {
  export interface Business {
    id: string;
    businessName: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: string;
    latitude: string;
    longitude: string;
  }

  export interface BusinessSystem {
    id: string;
    type: string;
    gallons: number;
    inches: number;
    businessId: string;
  }

  export interface Employee {
    id: string;
    fullName: string;
    admin: boolean;
  }

  export interface User {
    id: string;
    firstName: string;
    lastName: string;
    admin: boolean;
    businessName: string;
    businessId: string;
    business: Business;
  }

  export interface Job {
    id: string;
    propertySystemId: string;
    dateAssigned: string;
    technicianId: string;
    technicianName?: string;
    jobTypeId: string;
    note?: string;
    property?: Property.Property;
    jobType?: string;
    propertySystem?: Property.PropertySystem;
    includeOtherSystems?: boolean;
    includeNotes?: boolean;
    otherSystemIds?: string[];
    businessId?: string;
  }

  export interface JobType {
    id: string;
    type: string;
  }

  export interface ServiceNeed {
    id: string;
    property: Property.Property;
    system: Property.PropertySystem;
    daysUntilServiceDate: number;
    employeeOptions: Employee[];
    job: Job;
  }


}