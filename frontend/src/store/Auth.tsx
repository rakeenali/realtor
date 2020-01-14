import * as React from 'react';
import jwt_decode from 'jwt-decode';

import { Dispatch, TokenType, DecodedToken } from '../types/';

export interface IAuthState {
  isAuthenticated: boolean;
  accessToken: string;
  userRole: string;
}

type Action =
  | { type: 'LOGIN'; payload: { accessToken: string; userRole: string } }
  | { type: 'LOGOUT' };

export const AuthStateContext = React.createContext<IAuthState | null>(null);
export const AuthDispatchContext = React.createContext<Dispatch<Action> | null>(
  null,
);

const messageReducer = (state: IAuthState, action: Action): IAuthState => {
  switch (action.type) {
    case 'LOGIN': {
      return {
        ...state,
        isAuthenticated: true,
        accessToken: action.payload.accessToken,
        userRole: action.payload.userRole,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        accessToken: '',
        userRole: '',
      };
    }
    default: {
      throw new Error(`Action type is not found in user context`);
    }
  }
};

const INITIALSTATE: IAuthState = {
  isAuthenticated: false,
  accessToken: '',
  userRole: '',
};

export const AuthProvider: React.FC = (props): JSX.Element => {
  const [state, dispatch] = React.useReducer(messageReducer, INITIALSTATE);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {props.children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export const useAuthState = (): IAuthState => {
  const Context = React.useContext(AuthStateContext);

  if (!Context) {
    throw new Error(`useAuthState must be used iniside Message Provider`);
  }

  return Context;
};

export const useAuthDispatch = (): Dispatch<Action> => {
  const Context = React.useContext(AuthDispatchContext);

  if (!Context) {
    throw new Error(`useAuthDispatch must be used iniside Message Provider`);
  }

  return Context;
};

export const logUserIn = (dispatch: Dispatch<Action>): void => {
  const token = window.sessionStorage.getItem(TokenType.ACCESS_TOKEN);
  if (token) {
    const tokenDecoded: DecodedToken = jwt_decode(token);
    const bearerToken = `Bearer ${token}`;
    dispatch({
      type: 'LOGIN',
      payload: { accessToken: bearerToken, userRole: tokenDecoded.role },
    });
  }
};

export const logUserOut = (dispatch: Dispatch<Action>): void => {
  window.sessionStorage.clear();
  window.localStorage.clear();
  dispatch({ type: 'LOGOUT' });
};
