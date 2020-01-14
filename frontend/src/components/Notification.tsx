import React from 'react';

import {
  actionSetMessage,
  useMessageDispatch,
  useMessageState,
} from '../store/Message';

import { Popup, CloseButton } from '../styles/Notification';

const Notification = (): JSX.Element => {
  const messageDispatch = useMessageDispatch();
  const messageState = useMessageState();

  const closeMessage = (): void => {
    actionSetMessage(false, '', messageDispatch);
  };

  if (messageState.hasMessage) {
    return (
      <Popup>
        <span>{messageState.message}</span>
        <CloseButton className='close' onClick={closeMessage}>
          &times;
        </CloseButton>
      </Popup>
    );
  }

  return <React.Fragment></React.Fragment>;
};

export default Notification;
