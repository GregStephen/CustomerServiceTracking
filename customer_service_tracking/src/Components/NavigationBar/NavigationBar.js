/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import {
  NavLink as RRNavLink,
  Link,
  useHistory,
  Redirect,
} from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarText,
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
import firebase from 'firebase/app';
import 'firebase/auth';

import './NavigationBar.scss';

function NavigationBar({ userObj }) {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const logMeOut = () => {
    firebase.auth().signOut()
      .then(() => history.push('/'));
  };

  const buildAdminNavbar = () => (
    <Nav className="ml-auto" navbar>
      <NavItem>
        <NavLink tag={RRNavLink} to='/jobs'>Jobs</NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={RRNavLink} to='/team'>Team</NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={RRNavLink} to='/systems'>Systems</NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={RRNavLink} to='/reports'>Reports</NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={RRNavLink} to='/properties'>Properties</NavLink>
      </NavItem>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret className="navbar-user-button">
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem tag={Link} to={`/user/${userObj.id}`}>
            User Profile
          </DropdownItem>
          <DropdownItem onClick={logMeOut}>
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
          <DropdownItem tag={Link} to={`/user/${userObj.id}`}>
            User Profile
        </DropdownItem>
          <DropdownItem onClick={logMeOut}>
            Log Out
        </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </Nav>
  );

  return (
    <div className="NavigationBar">
      <Navbar dark color="dark" expand="md">
        <NavbarBrand className="navbar-brand" tag={RRNavLink} to='/'>Home</NavbarBrand>
        <NavbarText>{userObj?.businessName}</NavbarText>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          {userObj?.admin ? buildAdminNavbar()
            : buildRegularNavbar()
          }
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
