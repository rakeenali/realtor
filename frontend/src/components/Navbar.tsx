import React from 'react';
import { Link, Location, navigate } from '@reach/router';

import { useAuthState, useAuthDispatch, logUserOut } from '../store/Auth';

import { Nav, Logo, UL, LI } from '../styles/Navbar';

import { Routes } from '../types';

const Navbar = () => {
  const authState = useAuthState();
  const authDispatch = useAuthDispatch();

  const logout = (): void => {
    logUserOut(authDispatch);
    navigate(Routes.LOGIN);
  };

  if (authState.isAuthenticated) {
    return (
      <Location>
        {({ location: { pathname } }) => {
          return (
            <Nav>
              <Logo>
                <h2>REALTOR</h2>
              </Logo>
              <UL>
                <LI active={pathname === Routes.HOME}>
                  <Link to={Routes.HOME}>Home</Link>
                </LI>
                <LI active={pathname === Routes.PROFILE}>
                  <Link to={Routes.PROFILE}>Profile</Link>
                </LI>
                {authState.userRole === 'realtor' && (
                  <LI active={pathname === Routes.CREATE_FLAT}>
                    <Link to={Routes.CREATE_FLAT}>Create Flat</Link>
                  </LI>
                )}
                <LI>
                  <button onClick={logout}>Logout</button>
                </LI>
              </UL>
            </Nav>
          );
        }}
      </Location>
    );
  }

  return (
    <Location>
      {({ location: { pathname } }) => {
        return (
          <Nav>
            <Logo>
              <h2>REALTOR</h2>
            </Logo>
            <UL>
              <LI active={pathname === Routes.LOGIN}>
                <Link to={Routes.LOGIN}>LOGIN</Link>
              </LI>
              <LI active={pathname === Routes.REGISTER}>
                <Link to={Routes.REGISTER}>REGISTER</Link>
              </LI>
            </UL>
          </Nav>
        );
      }}
    </Location>
  );
};

export default Navbar;
