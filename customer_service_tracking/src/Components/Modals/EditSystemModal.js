import React from 'react';
import {
  Form, Button, ModalBody, ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';

const defaultSystem = {
  id: 0,
  type: '',
  gallons: 0,
  inches: 0,
};

class EditSystemModal extends React.Component {
  static propTypes = {
    system: PropTypes.object.isRequired,
    toggleModalOpen: PropTypes.func.isRequired,
    modalIsOpen: PropTypes.bool.isRequired,
    editSystem: PropTypes.func.isRequired,
    deleteSystem: PropTypes.func.isRequired,
  }

  state = {
    updatedSystem: defaultSystem,
  }

  componentDidMount() {
    const { system } = this.props;
    this.setState({ updatedSystem: system });
  }

  toggleModal = (e) => {
    const { toggleModalOpen, modalIsOpen } = this.props;
    toggleModalOpen(!modalIsOpen);
  };

  formSubmit = (e) => {
    e.preventDefault();
    const { updatedSystem } = this.state;
    const { editSystem } = this.props;
    updatedSystem.inches = parseInt(updatedSystem.inches, 10);
    updatedSystem.gallons = parseInt(updatedSystem.gallons, 10);
    editSystem.mutate(updatedSystem);
    this.toggleModal();
  };

  formFieldStringState = (e) => {
    const tempSystem = { ...this.state.updatedSystem };
    tempSystem[e.target.id] = e.target.value;
    this.setState({ updatedSystem: tempSystem });
  };

  deleteSystem = () => {
    const { deleteSystem, system } = this.props;
    deleteSystem.mutate(system.id);
  }

  render() {
    const { updatedSystem } = this.state;
    return (
      <div className="EditSystemModal">
        <Form onSubmit={this.formSubmit}>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="type">Type</label>
              <input
                type="input"
                className="form-control"
                id="type"
                value={updatedSystem.type}
                onChange={this.formFieldStringState}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="gallons">Gallons</label>
              <input
                type="number"
                className="form-control"
                id="gallons"
                min="0"
                value={updatedSystem.gallons}
                onChange={this.formFieldStringState}
                required
              />
              <div className="form-group">
                <label htmlFor="inches">Inches</label>
                <input
                  type="number"
                  className="form-control"
                  id="inches"
                  min="0"
                  value={updatedSystem.inches}
                  onChange={this.formFieldStringState}
                  required
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary">Edit System</Button>{' '}
            <Button color="secondary" value="info" onClick={this.toggleModal}>Cancel</Button>
            <Button color="danger" value="info" onClick={this.deleteSystem}>Delete?</Button>
          </ModalFooter>
        </Form>
      </div>
    );
  }
}

export default EditSystemModal;
