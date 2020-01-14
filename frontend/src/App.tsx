import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Router, navigate, Redirect } from '@reach/router';
import { useMutation } from 'urql';

import Theme from './Theme';
import { MessageProvider } from './store/Message';
import { useAuthDispatch, useAuthState, logUserIn } from './store/Auth';

import Register from './screens/Register';
import Login from './screens/Login';
import Profile from './screens/Profile';
import DefaultScreen from './screens/Default';
import CreateFlat from './screens/CreateFlat';
import Home from './screens/Home';

import RouterPage from './utilities/RouterPage';

import Navbar from './components/Navbar';
import Notification from './components/Notification';
import { FullScreenLoader } from './components/Loaders';

import { Routes, AppState, TokenType } from './types';

import { Authorization } from './graphql';

import { validToken } from './utilities/helper';

const GlobalStyle = createGlobalStyle`
  html {
        box-sizing: border-box;
    }
    *, *:before, *:after {
        box-sizing: inherit;
        margin: 0;
        padding: 0;
    }
    p { 
        margin:5px 0 10px 0;
    
    }
    body {
        line-height: 1;
        background-color: ${(props) => props.theme.white};
        color: ${(props) => props.theme.white};
        width: 100vw;
        min-height: 100vh;
        font-size: 10px;
        font-family:"lato" ,sans-serif;
        overflow-x:hidden;
    }
`;

const mutation = `
  mutation refreshLogin($refreshToken:String!){
    refreshLogin(refreshToken:$refreshToken){
      accessToken
      refreshToken
    }
  }
`;

type MutationInput = {
  refreshToken: string;
};

type MutationResponse = {
  refreshLogin: Authorization;
};

const App: React.FC = () => {
  const [res, executeMutation] = useMutation<MutationResponse, MutationInput>(
    mutation,
  );
  const [appState, setAppState] = React.useState<AppState>(AppState.IDLE);

  const authDispatch = useAuthDispatch();
  const authState = useAuthState();

  React.useEffect(() => {
    setAppState(AppState.LOADING);

    const accessToken = window.sessionStorage.getItem(TokenType.ACCESS_TOKEN);
    if (accessToken && validToken(accessToken)) {
      setAppState(AppState.LOADED);
      logUserIn(authDispatch);
      return;
    }
    const refreshToken = localStorage.getItem(TokenType.REFRESH_TOKEN);
    if (refreshToken) {
      executeMutation({ refreshToken });
      setAppState(AppState.LOADED);
      return;
    }

    setAppState(AppState.LOADED);
  }, [authDispatch, executeMutation]);

  if (res.error) {
    navigate(Routes.LOGIN);
  }

  if (res.data) {
    if (res.data.refreshLogin) {
      window.sessionStorage.setItem(
        TokenType.ACCESS_TOKEN,
        res.data.refreshLogin.accessToken,
      );
      localStorage.setItem(
        TokenType.REFRESH_TOKEN,
        res.data.refreshLogin.refreshToken,
      );
      window.location.reload();
    }
  }

  if (appState === AppState.IDLE) {
    return <React.Fragment></React.Fragment>;
  }

  if (appState === AppState.LOADING) {
    return (
      <React.Fragment>
        <Theme>
          <GlobalStyle />
          <FullScreenLoader />
        </Theme>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Theme>
        <MessageProvider>
          {/* -------------- */}
          <GlobalStyle />
          <Navbar />
          <Notification />
          {authState.isAuthenticated ? (
            <Router>
              <RouterPage path={Routes.PROFILE} pageComponent={Profile} />
              <RouterPage
                path={Routes.CREATE_FLAT}
                pageComponent={CreateFlat}
              />
              <RouterPage path={Routes.HOME} pageComponent={Home} />
              <Redirect from='/' to={Routes.HOME} />
              <RouterPage path='*' pageComponent={DefaultScreen} />
            </Router>
          ) : (
            <Router>
              <RouterPage path={Routes.REGISTER} pageComponent={Register} />
              <RouterPage path={Routes.LOGIN} pageComponent={Login} />
              <Redirect from='/' to={Routes.LOGIN} />
              <RouterPage path='*' pageComponent={DefaultScreen} />
            </Router>
          )}
        </MessageProvider>
      </Theme>
    </React.Fragment>
  );
};

export default App;
