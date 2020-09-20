import moment from 'moment';

const today = moment().format('YYYY-MM-DD');

const defaultCustomerSystem = {
  customerId: '',
  systemId: '',
  installDate: '',
  nozzles: 0,
  notes: '',
  serialNumber: '',
  sold: false,
  sprayCycles: 0,
  sprayDuration: 0,
};

const defaultSystem = {
  id: '',
  customerId: '',
  installDate: '',
  notes: '',
  nozzles: 0,
  serialNumber: '',
  sold: false,
  sprayCycles: 0,
  sprayDuration: 0,
  systemId: '',
  systemInfo: {
    id: '',
    type: '',
    gallons: '',
    inches: '',
  },
};

const defaultCustomer = {
  id: '',
  firstName: '',
  lastName: '',
  officePhone: '',
  homePhone: '',
  address: {
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
  },
  systems: [
    defaultSystem,
  ],
};

const defaultReport = {
  amountRemaining: 0,
  customerId: '',
  inchesAdded: 0,
  notes: '',
  serviceDate: today,
  solutionAdded: 0,
  systemId: '',
  technicianId: '',
  jobTypeId: '',
};

const defaultJobTypes = [{
  id: '',
  type: '',
}];

export default {
  defaultJobTypes,
  defaultReport,
  defaultSystem,
  defaultCustomer,
  defaultCustomerSystem,
};
