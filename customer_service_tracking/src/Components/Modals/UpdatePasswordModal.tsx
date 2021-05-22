import React, { useState } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Label,
  Input,
  FormFeedback,
} from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface Props {
  isToggled: boolean;
  setIsToggled: React.Dispatch<React.SetStateAction<boolean>>;
}

function UpdatePasswordModal({ isToggled, setIsToggled }: Props) {
  const user = firebase.auth().currentUser;
  const [error, setError] = useState('');

  const initialValues = {
    oldPassword: '',
    newPassword: '',
    passwordConfirm: '',
  };

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Password is required'),
    newPassword: Yup.string().required(),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (formValues) => {
      const email = user?.email ?? '';
      const cred = firebase.auth.EmailAuthProvider.credential(
        email, formValues.oldPassword,
      );
      user?.reauthenticateWithCredential(cred)
        .then(() => user.updatePassword(formValues.newPassword).then(() => setIsToggled(false)))
        .catch((err) => setError(err.message));
    },
  });

  return (<>
    <Modal isOpen={isToggled} toggle={() => setIsToggled(false)}>
      <ModalHeader toggle={() => setIsToggled(false)}>Change Password</ModalHeader>
      <Form onSubmit={formik.handleSubmit}>
        <ModalBody>
          <FormGroup>
            <Label for="oldPassword">Old Password</Label>
            <Input
              type="password"
              id="oldPassword"
              {...formik.getFieldProps('oldPassword')}
            />
            {formik.touched.oldPassword
              && <FormFeedback className="d-block">{formik.errors?.oldPassword}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for="newPassword">New Password</Label>
            <Input
              type="password"
              id="newPassword"
              {...formik.getFieldProps('newPassword')}
            />
            {formik.touched.newPassword
              && <FormFeedback className="d-block">{formik.errors?.newPassword}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for="passwordConfirm">Confirm New Password</Label>
            <Input
              type="password"
              id="passwordConfirm"
              {...formik.getFieldProps('passwordConfirm')}
            />
            {formik.touched.passwordConfirm
              && <FormFeedback className="d-block">{formik.errors?.passwordConfirm}</FormFeedback>}
          </FormGroup>
          <p className="error">{error}</p>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary">Change Password</Button>{' '}
          <Button color="secondary" onClick={() => setIsToggled(false)}>Cancel</Button>
        </ModalFooter>
      </Form>
    </Modal>
  </>
  );
}

export default UpdatePasswordModal;
