import moment from 'moment';

const today = moment().format('YYYY-MM-DD');

const defaultSystem = {
  id: '',
  propertyId: '',
  serviceOptionId: 0,
  installDate: '',
  notes: '',
  nozzles: '',
  serialNumber: '',
  sold: false,
  sprayCycles: '',
  sprayDuration: '',
  systemId: '',
  displayName: '',
  systemInfo: {
    id: '',
    type: '',
    gallons: '',
    inches: '',
  },
};


const defaultReport = {
  amountRemaining: '',
  customerId: '',
  inchesAdded: '',
  notes: '',
  serviceDate: today,
  solutionAdded: '',
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
};
