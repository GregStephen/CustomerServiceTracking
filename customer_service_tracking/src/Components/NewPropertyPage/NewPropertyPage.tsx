import React, {
  useCallback,
  useState,
  useContext,
  useMemo,
} from 'react';
import {
  Col,
  Row,
  FormGroup,
  Form,
  FormFeedback,
  Label,
  Input,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import MaskedInput from 'react-input-mask';
import { Header, Page } from '../Global';

import UserContext from '../../Contexts/UserContext';
import { useAddNewProperty, useGetPropertiesForBusiness } from '../../Helpers/Data/PropertyRequests';
import usePropertyGeo from '../../Helpers/Data/GeocodingRequests';
import ConfirmAddressModal from '../Modals/ConfirmAddressModal';
import { States } from '../../Helpers/states';
const defaultPrimaryContact = {
  firstName: '',
  lastName: '',
  workPhone: '',
  homePhone: '',
  cellPhone: '',
  email: '',
  primary: true,
};

const defaultNewProperty = {
  property:{
    displayName: '',
    city: '',
    state: '',
    zipCode: '',
    addressLine1: '',
    addressLine2: '',
    latitude: '',
    longitude: '',
    businessId: ''
  } as Partial<Property.Property>,
  contact: defaultPrimaryContact,
};

const newPropertyValidationSchema = Yup.object().shape({
  property: Yup.object().shape({
    displayName: Yup.string().required('Display Name is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().length(2, 'Please use 2 letter state abbreviation').required('State is required'),
    zipCode: Yup.string().length(5, 'Zip Code must be only 5 digits long').required('Zip Code is required'),
    addressLine1: Yup.string().required('Address line is required'),
    addressLine2: Yup.string().notRequired(),
  }),
  contact: Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    workPhone: Yup.string().notRequired().matches(/^[0-9]{10}$/, 'Phone number is not valid'),
    homePhone: Yup.string().notRequired().matches(/^[0-9]{10}$/, 'Phone number is not valid'),
    cellPhone: Yup.string().notRequired().matches(/^[0-9]{10}$/, 'Phone number is not valid'),
    email: Yup.string().notRequired().matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Email is not valid'),
  }),
});

function NewPropertyPage() {
  const userObj = useContext(UserContext);
  const history = useHistory();
  const [confirmAddressModalIsToggled, setConfirmAddressModalIsToggled] = useState(false);
  const [geocodingAddress, setGeocodingAddress] = useState<GeocodingAddress>();
  const businessProperties = useGetPropertiesForBusiness(userObj.businessId);
  const addnewProperty = useAddNewProperty();
  const getPropertyGeo = usePropertyGeo();

  const checkAddressNulls = (address: any) => {
    if (address?.number && address?.street && address?.city && address?.state && address?.zip) {
      return true;
    }
    return false;
  };

  const duplicateCheck = useMemo(() => {
    if (businessProperties.data) {
      return businessProperties.data?.some((x) => x.latitude === geocodingAddress?.location.lat.toString()
        && x.longitude === geocodingAddress?.location.lng.toString())
    } else {
      return false;
    }
  },
  [businessProperties.data, geocodingAddress]);

  const formik = useFormik({
    initialValues: defaultNewProperty,
    enableReinitialize: true,
    validationSchema: newPropertyValidationSchema,
    onSubmit: (formValues, { setValues }) => {
      const newProperty = { ...formValues };
      setValues(newProperty);
      getPropertyGeo.mutate(newProperty.property, {
        onSuccess: (data) => {
          if (checkAddressNulls(data.data.resuls[0].address_components)) {
            setGeocodingAddress(data.data.results[0]);
          } else {
            setGeocodingAddress(undefined);
          }
          setConfirmAddressModalIsToggled(true);
        },
      });
    },
  });

  const createProperty = useCallback(() => {
    const propertyToConfirm = { ...defaultNewProperty, ...formik.values };
    if (geocodingAddress) {
      propertyToConfirm.property.businessId = userObj.businessId;
      propertyToConfirm.property.latitude = geocodingAddress?.location.lat.toString();
      propertyToConfirm.property.longitude = geocodingAddress.location.lng.toString();
      const addressLine1 = `${geocodingAddress.address_components.number} ${geocodingAddress.address_components.street} ${geocodingAddress.address_components.suffix}`;
      propertyToConfirm.property.addressLine1 = addressLine1;
      propertyToConfirm.property.city = geocodingAddress.address_components.city;
      propertyToConfirm.property.state = geocodingAddress.address_components.state;
      propertyToConfirm.property.zipCode = geocodingAddress.address_components.zip;
      addnewProperty.mutate(propertyToConfirm, {
        onSuccess: () => {
          setConfirmAddressModalIsToggled(false);
          history.push('/properties');
        },
      });
    }
  }, [userObj, geocodingAddress, addnewProperty, history, formik]);

  return (
    <Page>
      <>
        <Header title="New Property" icon="fa-house-user" />
        <div className="widget col-sm-10 col-lg-8 col-xl-6 d-flex justify-content-center mb-4">
          <Form className="col-10 mt-3" onSubmit={formik.handleSubmit}>
            <h2>Property Info</h2>
            <Row form>
              <Col md={6} sm={12}>
                <FormGroup>
                  <Label for="displayName">Property Display Name</Label>
                  <Input
                    type="text"
                    id="displayName"
                    {...formik.getFieldProps('property.displayName')}
                  />
                  {formik.touched.property?.displayName
                      && <FormFeedback className="d-block">{formik.errors?.property?.displayName}</FormFeedback>}
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="property.addressLine1">Address Line</Label>
                  <Input
                    type="text"
                    id="property.addressLine1"
                    {...formik.getFieldProps('property.addressLine1')}
                  />
                  {formik.touched.property?.addressLine1
                      && <FormFeedback className="d-block error">{formik.errors?.property?.addressLine1}</FormFeedback>}
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="property.addressLine2">Address Line 2</Label>
                  <Input
                    type="text"
                    id="property.addressLine2"
                    {...formik.getFieldProps('property.addressLine2')}
                  />
                  {formik.touched.property?.addressLine2
                      && <FormFeedback className="d-block">{formik.errors?.property?.addressLine2}</FormFeedback>}
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="property.city">City</Label>
                  <Input
                    type="text"
                    id="property.city"
                    {...formik.getFieldProps('property.city')}
                  />
                  {formik.touched.property?.city
                      && <FormFeedback className="d-block">{formik.errors?.property?.city}</FormFeedback>}
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <Label for="property.state">State</Label>
                  <Input
                    type="select"
                    id="property.state"
                    {...formik.getFieldProps('property.state')}>
                    <option value=""></option>
                    {States.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </Input>
                  {formik.touched.property?.state
                      && <FormFeedback className="d-block">{formik.errors?.property?.state}</FormFeedback>}
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="property.zipCode">Zip Code</Label>
                  <Input
                    type="text"
                    id="property.zipCode"
                    {...formik.getFieldProps('property.zipCode')}
                  />
                  {formik.touched.property?.zipCode
                      && <FormFeedback className="d-block">{formik.errors?.property?.zipCode}</FormFeedback>}
                </FormGroup>
              </Col>
            </Row>
            <hr />
            <h2>Primary Contact</h2>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="contact.firstName">First Name</Label>
                  <Input
                    type="text"
                    id="contact.firstName"
                    {...formik.getFieldProps('contact.firstName')}
                  />
                  {formik.touched.contact?.firstName
                      && <FormFeedback className="d-block">{formik.errors?.contact?.firstName}</FormFeedback>}
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="contact.lastName">Last Name</Label>
                  <Input
                    type="text"
                    id="contact.lastName"
                    {...formik.getFieldProps('contact.lastName')}
                  />
                  {formik.touched.contact?.lastName
                      && <FormFeedback className="d-block">{formik.errors?.contact?.lastName}</FormFeedback>}
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label for="contact.homePhone">Home Phone</Label>
                  <MaskedInput
                    mask="(999) 999-9999"
                    value={formik.values.contact.homePhone}
                    onBlur={(e) => formik.handleBlur(e)}
                    onChange={(e) => formik.setFieldValue('contact.homePhone', e.target.value.replace(/\D/g, ''))}>
                    {() => (<Input
                      type="text"
                      name="homePhone"
                      id="homePhone"
                    />)}
                  </MaskedInput>
                  {formik.touched.contact?.homePhone
                      && <FormFeedback className="d-block">{formik.errors?.contact?.homePhone}</FormFeedback>}
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="contact.cellPhone">Cell Phone</Label>
                  <MaskedInput
                    mask="(999) 999-9999"
                    value={formik.values.contact.cellPhone}
                    onBlur={(e) => formik.handleBlur(e)}
                    onChange={(e) => formik.setFieldValue('contact.cellPhone', e.target.value.replace(/\D/g, ''))}>
                    {() => (<Input
                      type="text"
                      name="cellPhone"
                      id="cellPhone"
                    />)}
                  </MaskedInput>
                  {formik.touched.contact?.cellPhone
                      && <FormFeedback className="d-block">{formik.errors?.contact?.cellPhone}</FormFeedback>}
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="contact.workPhone">Work Phone</Label>
                  <MaskedInput
                    mask="(999) 999-9999"
                    value={formik.values.contact.workPhone}
                    onBlur={(e) => formik.handleBlur(e)}
                    onChange={(e) => formik.setFieldValue('contact.workPhone', e.target.value.replace(/\D/g, ''))}>
                    {() => (<Input
                      type="text"
                      name="contact.workPhone"
                      id="contact.workPhone"
                    />)}
                  </MaskedInput>
                  {formik.touched.contact?.workPhone
                      && <FormFeedback className="d-block">{formik.errors?.contact?.workPhone}</FormFeedback>}
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={12}>
                <FormGroup>
                  <Label for="contact.email">Email</Label>
                  <Input
                    type="email"
                    id="contact.email"
                    {...formik.getFieldProps('contact.email')}
                  />
                  {formik.touched.contact?.email
                      && <FormFeedback className="d-block">{formik.errors?.contact?.email}</FormFeedback>}
                </FormGroup>
              </Col>
            </Row>
            <button type="submit" className="btn btn-success">Add New Property</button>
          </Form>
        </div>
        <ConfirmAddressModal
          address={geocodingAddress}
          setConfirmAddressModalIsToggled={setConfirmAddressModalIsToggled}
          confirmAddressModalIsToggled={confirmAddressModalIsToggled}
          onSuccessFunction={createProperty}
          isDuplicate={duplicateCheck}
        />
      </>
    </Page>
  );
}

export default NewPropertyPage;
