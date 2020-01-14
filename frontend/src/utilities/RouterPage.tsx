import React from 'react';
import { RouteComponentProps } from '@reach/router';

interface ExtendProps extends React.PropsWithChildren<any> {
  pageComponent: React.FC;
}

const RouterPage = ({
  children,
  ...props
}: ExtendProps & RouteComponentProps): React.ReactElement => {
  const { pageComponent, ...others } = props;
  return <props.pageComponent {...others}>{children}</props.pageComponent>;
};

export default RouterPage;
