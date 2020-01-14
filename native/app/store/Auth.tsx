import * as React from 'react'
import jwt_decode from 'jwt-decode'
import * as SecureStore from 'expo-secure-store'

import { Dispatch, TokenType, DecodedToken } from '../types/'

export interface IAuthState {
  isAuthenticated: boolean
  accessToken: string
  userRole: string
}

type Action =
  | { type: 'LOGIN'; payload: { accessToken: string; userRole: string } }
  | { type: 'LOGOUT' }

export const AuthStateContext = React.createContext<IAuthState | null>(null)
export const AuthDispatchContext = React.createContext<Dispatch<Action> | null>(
  null
)

const messageReducer = (state: IAuthState, action: Action): IAuthState => {
  switch (action.type) {
    case 'LOGIN': {
      return {
        ...state,
        isAuthenticated: true,
        accessToken: action.payload.accessToken,
        userRole: action.payload.userRole,
      }
    }
    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        accessToken: '',
        userRole: '',
      }
    }
    default: {
      throw new Error(`Action type is not found in user context`)
    }
  }
}

const INITIALSTATE: IAuthState = {
  isAuthenticated: false,
  accessToken: '',
  userRole: '',
}

export const AuthProvider: React.FC = (props): JSX.Element => {
  const [state, dispatch] = React.useReducer(messageReducer, INITIALSTATE)

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {props.children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  )
}

export const useAuthState = (): IAuthState => {
  const Context = React.useContext(AuthStateContext)

  if (!Context) {
    throw new Error(`useAuthState must be used iniside Message Provider`)
  }

  return Context
}

export const useAuthDispatch = (): Dispatch<Action> => {
  const Context = React.useContext(AuthDispatchContext)

  if (!Context) {
    throw new Error(`useAuthDispatch must be used iniside Message Provider`)
  }

  return Context
}

export const logUserIn = async (dispatch: Dispatch<Action>): Promise<void> => {
  try {
    const accessToken = await SecureStore.getItemAsync(TokenType.ACCESS_TOKEN)
    const tokenDecoded: DecodedToken = jwt_decode(accessToken)
    const bearerToken = `Bearer ${accessToken}`

    dispatch({
      type: 'LOGIN',
      payload: { accessToken: bearerToken, userRole: tokenDecoded.role },
    })
  } catch (err) {
    throw err
  }
}

export const logUserOut = async (dispatch: Dispatch<Action>): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(TokenType.REFRESH_TOKEN)
    await SecureStore.deleteItemAsync(TokenType.ACCESS_TOKEN)
    dispatch({ type: 'LOGOUT' })
  } catch (err) {
    throw err
  }
}
