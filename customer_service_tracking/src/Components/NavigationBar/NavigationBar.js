/* eslint-disable no-nested-ternary */
import React from 'react';
import { NavLink as RRNavLink, Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from 'reactstrap';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';

import './NavigationBar.scss';

class NavigationBar extends React.Component {
  static propTypes = {
    userObj: PropTypes.object.isRequired,
    authorized: PropTypes.bool.isRequired,
  }

  state = {
    isOpen: false,
  }

  static propTypes = {
    authorized: PropTypes.bool.isRequired,
    userObj: PropTypes.object,
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  };

  render() {
    const { authorized, userObj } = this.props;
    const buildAdminNavbar = () => (
        <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink tag={RRNavLink} to='/systems'>Systems</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to='/customers'>Customers</NavLink>
            </NavItem>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret className="navbar-user-button">
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem tag={Link} to='/profile'>
              User Profile
            </DropdownItem>
            <DropdownItem onClick={this.logMeOut}>
                Log Out
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    );

    const buildRegularNavbar = () => (
      <Nav className="ml-auto" navbar>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret className="navbar-user-button">
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem tag={Link} to='/profile'>
            User Profile
          </DropdownItem>
          <DropdownItem onClick={this.logMeOut}>
              Log Out
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </Nav>
    );

    return (
      <div className="NavigationBar">
          <Navbar dark color="dark" expand="md">
            <NavbarBrand className="navbar-brand" tag={RRNavLink} to='/home'>Home</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              {authorized && userObj.admin ? buildAdminNavbar()
                : authorized && !userObj.admin ? buildRegularNavbar()
                  : ''}
            </Collapse>
          </Navbar>
      </div>
    );
  }
}

export default NavigationBar;
