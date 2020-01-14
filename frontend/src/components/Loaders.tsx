import React from 'react';
import { BarLoader, ClimbingBoxLoader, RingLoader } from 'react-spinners';

import { BarLoaderStyle } from '../styles/FormStyle';
import { FullScreenLoaderStyle, ContainerLoaderStyle } from '../styles/Loaders';

type IProps = {
  loading: boolean;
};

const FormLoader: React.FC<IProps> = (props) => {
  if (props.loading) {
    return (
      <BarLoaderStyle>
        <BarLoader color={'#FFFFFA'} />
      </BarLoaderStyle>
    );
  }
  return null;
};

const FullScreenLoader: React.FC = (): JSX.Element => {
  return (
    <FullScreenLoaderStyle>
      <ClimbingBoxLoader size={40} color='#702632' />
    </FullScreenLoaderStyle>
  );
};

const ContainerLoader: React.FC = (): JSX.Element => {
  return (
    <ContainerLoaderStyle>
      <RingLoader size={190} color='#702632' />
    </ContainerLoaderStyle>
  );
};

export { FormLoader, FullScreenLoader, ContainerLoader };
