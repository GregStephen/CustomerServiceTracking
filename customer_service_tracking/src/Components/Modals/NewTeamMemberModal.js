import React, { useContext, useState } from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';
import {
  Row,
  Col,
  ModalBody,
  Modal,
  ModalHeader,
  Button,
  ModalFooter,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
} from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import constants from '../../Helpers/apiKeys.json';
import UserContext from '../../Contexts/UserContext';

const initialValues = {
  businessId: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

function NewTeamMemberModal() {
  const userObj = useContext(UserContext);
  const [isToggled, setIsToggled] = useState(false);
  // const addTeamMember = useAddNewTeamMember();

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (formValues, { setSubmitting }) => {
      const newTeamMember = { ...formValues };
      newTeamMember.businessId = userObj.businessId;
      const secondaryApp = firebase.initializeApp(constants.firebaseKeys, 'Secondary');
      secondaryApp.auth().createUserWithEmailAndPassword(newTeamMember.email, newTeamMember.password)
        .then((cred) => {
          newTeamMember.firebaseUid = cred.user.uid;
          delete newTeamMember.email;
          delete newTeamMember.password;
          delete newTeamMember.passwordConfirm;
          // I don't know if the next statement is necessary
          secondaryApp.auth().signOut();
          setSubmitting(false);
          setIsToggled(false);
        });
    },
  });


  return (<>
    <Button className="mr-4 mb-4" color="primary" onClick={() => setIsToggled(true)}><i className="fa fa-user-plus" /></Button>
    <Modal isOpen={isToggled} toggle={() => setIsToggled(false)}>
      <ModalHeader toggle={() => setIsToggled(false)}>New Team Member</ModalHeader>
      <Form className="col-12" onSubmit={formik.handleSubmit}>
        <ModalBody>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  type="input"
                  name="firstName"
                  id="firstName"
                  {...formik.getFieldProps('firstName')}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  type="input"
                  name="lastName"
                  id="lastName"
                  {...formik.getFieldProps('lastName')}
                />
                {formik.touched.lastName
                  && <FormFeedback className="d-block">{formik.errors?.lastName}</FormFeedback>}
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={12}>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.email
                  && <FormFeedback className="d-block">{formik.errors?.email}</FormFeedback>}
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label htmlFor="password">Dummy Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  {...formik.getFieldProps('password')}
                />
                {formik.touched.password
                  && <FormFeedback className="d-block">{formik.errors?.password}</FormFeedback>}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label htmlFor="passwordConfirm">Confirm Password</Label>
                <Input
                  type="password"
                  name="passwordConfirm"
                  id="passwordConfirm"
                  {...formik.getFieldProps('passwordConfirm')}
                />
                {formik.touched.passwordConfirm
                  && <FormFeedback className="d-block">{formik.errors?.passwordConfirm}</FormFeedback>}
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary">Create Team Member</Button>{' '}
          <Button color="secondary" value="info" onClick={() => setIsToggled(false)}>Cancel</Button>
        </ModalFooter>
      </Form>
    </Modal>
  </>);
}

export default NewTeamMemberModal;
