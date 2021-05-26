import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Form,
  FormFeedback,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';
import { PasswordResetModal } from '../../Modals';

import './LogInForm.scss';

interface Props {
  loggingIn: any;
  error: string;
}

function LogInForm({loggingIn, error}: Props) {

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const initialValues = {
    email: '',
    password: '',
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (formValues, { setSubmitting }) => {
      loggingIn(formValues.email, formValues.password);
      setSubmitting(false);
    },
  });

  return (
    <div className="LogInForm col-12 col-md-6 col-lg-4">
      <Form className="sign-in-form" onSubmit={formik.handleSubmit}>
        <h3 className="sign-in-header">Log In</h3>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            className="form-control"
            id="email"
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email
              && <FormFeedback className="d-block">{formik.errors?.email}</FormFeedback>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            className="form-control"
            id="password"
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password
              && <FormFeedback className="d-block">{formik.errors?.password}</FormFeedback>}
          <PasswordResetModal/>
        </FormGroup>
        <Button type="submit" color="info">Log In</Button>
        <p className="error">{error}</p>
      </Form>
    </div>
  )

}

export default LogInForm;
