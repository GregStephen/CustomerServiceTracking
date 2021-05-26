import React, { useCallback, useState } from 'react';
import {
  Form,
  Modal,
  ModalBody,
  Label,
  Input,
  ModalFooter,
  Button,
} from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/auth';

function PasswordResetModal() {
  const [isToggled, setIsToggled] = useState(false);
  const [email, setEmail] = useState<string>();
  const [error, setError] = useState<string>();

  const resetPassword = useCallback((e) => {
    e.preventDefault();
    if (email) {
      firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
          setIsToggled(!isToggled);
        })
        .catch((err) => {
          console.error(err);
          if (err.code === 'auth/user-not-found') {
            setError('Sorry, we have no record of that email');
          }
          if (err.code === 'auth/invalid-email') {
            setError(err.message);
          }
        });
    }
  }, [email, isToggled]);

  return (<>
    <small className="form-text text-muted">
      <Button type="button" className="forgotPasswordBtn" onClick={() => setIsToggled(true)}>Forgot Password</Button>
    </small>
    <Modal isOpen={isToggled} toggle={() => setIsToggled(false)}>
      <Form onSubmit={(e: any) => resetPassword(e)}>
        <ModalBody>
          <p>An email will be sent for you to reset your password</p>
          <Label for="email">Enter Your Email:</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            required>
          </Input>
          <p className="error">{error}</p>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary">Send Email</Button>{' '}
          <Button color="secondary" onClick={() => setIsToggled(false)}>Cancel</Button>
        </ModalFooter>

      </Form>
    </Modal>
  </>)
}

export default PasswordResetModal;
