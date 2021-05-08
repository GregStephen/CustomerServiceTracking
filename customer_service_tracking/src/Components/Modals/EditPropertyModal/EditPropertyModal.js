import React, { useCallback, useState } from 'react';
import {
  Form,
  FormFeedback,
  FormGroup,
  Label,
  Input,
  Button,
  ModalBody,
  ModalFooter,
  Modal,
  ModalHeader,
} from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import usePropertyGeo from '../../../Helpers/Data/GeocodingRequests';
import { useUpdateProperty } from '../../../Helpers/Data/PropertyRequests';
import ConfirmAddressModal from '../ConfimAddressModal/ConfirmAddressModal';

const editPropertyValidationSchema = Yup.object().shape({
  addressLine1: Yup.string().required('Address is required'),
  addressLine2: Yup.string().notRequired().nullable(),
  city: Yup.string().required('City is required'),
  state: Yup.string().length(2).required('State is required'),
  zipCode: Yup.string().length(5).required('Zip Code is required'),
});

function EditPropertyModal({ property, isToggled, setIsToggled }) {
  const updateProperty = useUpdateProperty();
  const [confirmAddressModalIsToggled, setConfirmAddressModalIsToggled] = useState(false);
  const [geocodingAddress, setGeocodingAddress] = useState();

  const getPropertyGeo = usePropertyGeo();

  const formik = useFormik({
    initialValues: property,
    enableReinitialize: true,
    validationSchema: editPropertyValidationSchema,
    onSubmit: (formValues, { setSubmitting }) => {
      const submission = { ...formValues };
      getPropertyGeo.mutate(submission, {
        onSuccess: (data) => {
          setGeocodingAddress(data.data.results[0]);
          setConfirmAddressModalIsToggled(true);
        },
      });
    },
  });

  const updatePropertyFunction = useCallback(() => {
    const propertyToConfirm = { ...property, ...formik.values };
    propertyToConfirm.latitude = geocodingAddress.location.lat.toString();
    propertyToConfirm.longitude = geocodingAddress.location.lng.toString();
    const addressLine1 = `${geocodingAddress.address_components.number} ${geocodingAddress.address_components.street} ${geocodingAddress.address_components.suffix}`;
    propertyToConfirm.addressLine1 = addressLine1;
    propertyToConfirm.city = geocodingAddress.address_components.city;
    propertyToConfirm.state = geocodingAddress.address_components.state;
    propertyToConfirm.zipCode = geocodingAddress.address_components.zip;
    updateProperty.mutate(propertyToConfirm, {
      onSuccess: () => {
        setConfirmAddressModalIsToggled(false);
        setIsToggled(false);
      },
    });
  }, [property, updateProperty, geocodingAddress, formik, setIsToggled]);

  return (<>
    <Modal isOpen={isToggled} toggle={() => setIsToggled(false)}>
      <ModalHeader toggle={() => setIsToggled(false)}>Edit Property</ModalHeader>
      <Form onSubmit={formik.handleSubmit}>
        <ModalBody>
          <FormGroup>
            <Label htmlFor="addressLine1">Address</Label>
            <Input
              type="input"
              className="form-control"
              id="addressLine1"
              {...formik.getFieldProps('addressLine1')}
            />
            {formik.touched.addressLine1
              && <FormFeedback className="d-block">{formik.errors?.addressLine1}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="addressLine2">Address Line 2</Label>
            <Input
              type="input"
              className="form-control"
              id="addressLine2"
              {...formik.getFieldProps('addressLine2')}
            />
            {formik.touched.addressLine2
              && <FormFeedback className="d-block">{formik.errors?.addressLine2}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="city">City</Label>
            <Input
              type="input"
              className="form-control"
              id="city"
              {...formik.getFieldProps('city')}
            />
            {formik.touched.city
              && <FormFeedback className="d-block">{formik.errors?.city}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="state">State</Label>
            <Input
              type="input"
              className="form-control"
              id="state"
              {...formik.getFieldProps('state')}
            />
            {formik.touched.state
              && <FormFeedback className="d-block">{formik.errors?.state}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input
              type="input"
              className="form-control"
              id="zipCode"
              {...formik.getFieldProps('zipCode')}
            />
            {formik.touched.zipCode
              && <FormFeedback className="d-block">{formik.errors?.zipCode}</FormFeedback>}
          </FormGroup>
          <ConfirmAddressModal
        address={geocodingAddress}
        newProperty={formik.values}
        setConfirmAddressModalIsToggled={setConfirmAddressModalIsToggled}
        confirmAddressModalIsToggled={confirmAddressModalIsToggled}
        onSuccessFunction={updatePropertyFunction}
      />
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary">Edit Property</Button>{' '}
          <Button color="secondary" value="info" onClick={() => setIsToggled(false)}>Cancel</Button>
        </ModalFooter>
      </Form>
    </Modal>
  </>);
}

export default EditPropertyModal;
