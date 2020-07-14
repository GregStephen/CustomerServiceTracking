import React from 'react';
import PropTypes from 'prop-types';

import {
  FormGroup, Label, Input,
} from 'reactstrap';

import BusinessRequests from '../../../Helpers/Data/BusinessRequests';

class ChooseBusinessForPersonalPage extends React.Component {
  static propTypes = {
    authorized: PropTypes.bool.isRequired,
  }

  state = {
    businessOptions: [],
    chosenBusiness: '',
    email: '',
    error: '',
  }

  componentDidMount() {
    BusinessRequests.getBusinesses()
      .then((businesses) => {
        this.setState({ businessOptions: businesses });
      })
      .catch((err) => console.error(err));
  }

  formFieldStringState = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  checkBusinessForEmail = (e) => {
    e.preventDefault();
    // checks db for that business and if that email is added.
    // if true then proceed to next page
    // if false then throw an error on the screen
  };

  render() {
    const { businessOptions, chosenBusiness, email } = this.state;
    return (
      <div>
        <h1>Choose business then enter email</h1>
        <form onSubmit={this.checkBusinessForEmail}>
          <FormGroup>
            <Label htmlFor="chosenBusiness">Which business do you work for?</Label>
            <Input
              type="select"
              name="chosenBusiness"
              id="chosenBusiness"
              value={chosenBusiness}
              onChange={this.formFieldStringState}
              required>
              <option value="">Select a business</option>
              {businessOptions.map((object) => (
                <option key={object.id} value={object.id}>{object.businessName}</option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={this.formFieldStringState}
              placeholder="Tom@ExampleEmail.com"
              required
            />
          </FormGroup>
          <button type="submit" className="btn btn-success">Continue</button>
        </form>
      </div>
    );
  }
}

export default ChooseBusinessForPersonalPage;
