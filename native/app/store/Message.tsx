import * as React from 'react';

import { Dispatch } from '../types/';

export interface IMessageState {
  hasMessage: boolean;
  message: string;
}

type Action =
  | { type: 'SHOW_MESSAGE'; payload: string }
  | { type: 'HIDE_MESSAGE' };

export const MessageStateContext = React.createContext<IMessageState | null>(
  null,
);
export const MessageDispatchContext = React.createContext<Dispatch<
  Action
> | null>(null);

const messageReducer = (
  state: IMessageState,
  action: Action,
): IMessageState => {
  switch (action.type) {
    case 'SHOW_MESSAGE': {
      return { ...state, hasMessage: true, message: action.payload };
    }
    case 'HIDE_MESSAGE': {
      return { ...state, hasMessage: false, message: '' };
    }
    default: {
      throw new Error(`Action type is not found in user context`);
    }
  }
};

const INITIALSTATE: IMessageState = {
  hasMessage: false,
  message: '',
};

export const MessageProvider: React.FC = (props): JSX.Element => {
  const [state, dispatch] = React.useReducer(messageReducer, INITIALSTATE);

  return (
    <MessageStateContext.Provider value={state}>
      <MessageDispatchContext.Provider value={dispatch}>
        {props.children}
      </MessageDispatchContext.Provider>
    </MessageStateContext.Provider>
  );
};

export const useMessageState = (): IMessageState => {
  const Context = React.useContext(MessageStateContext);

  if (!Context) {
    throw new Error(`useMessageState must be used iniside Message Provider`);
  }

  return Context;
};

export const useMessageDispatch = (): Dispatch<Action> => {
  const Context = React.useContext(MessageDispatchContext);

  if (!Context) {
    throw new Error(`useMessageDispatch must be used iniside Message Provider`);
  }

  return Context;
};

export const actionSetMessage = (
  hasMessage: boolean,
  message: string,
  dispatch: Dispatch<Action>,
): void => {
  if (hasMessage) {
    dispatch({ type: 'SHOW_MESSAGE', payload: message });
    return;
  }
  dispatch({ type: 'HIDE_MESSAGE' });
};
