import moment from 'moment';

const today = moment().format('YYYY-MM-DD');

const defaultSystem: Property.PropertySystem = {
  id: '',
  propertyId: '',
  serviceOptionId: 0,
  installDate: '',
  notes: '',
  nozzles: 0,
  serialNumber: '',
  sold: false,
  sprayCycles: 0,
  sprayDuration: 0,
  systemId: '',
  displayName: '',
  enabled: false,
  nextServiceDate: 0,
  systemInfo: {
    id: '',
    type: '',
    gallons: 0,
    inches: 0,
    businessId: '',
  } as Business.BusinessSystem,
};


const defaultReport: Partial<Property.Report> = {
  id: '',
  amountRemaining: 0,
  propertyId: '',
  inchesAdded: 0,
  notes: '',
  serviceDate: today,
  solutionAdded: 0,
  systemId: '',
  technicianId: '',
  jobTypeId: '',
};

const defaultJobTypes: Business.JobType[] = [{
  id: '',
  type: '',
}];

export default {
  defaultJobTypes,
  defaultReport,
  defaultSystem,
};
