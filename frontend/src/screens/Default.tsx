import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

const Center = styled.div`
  width: 100vw;
  height: calc(100vh - ${(props) => props.theme.navbarHeigth});
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: ${(props) => props.theme.maroon};
  }

  a {
    text-decoration: none;
    font-size: 1.5rem;
    background-color: ${(props) => props.theme.red};
    padding: 1rem;
    color: ${(props) => props.theme.white};
    border-radius: 1rem;
    transform: ${(props) => props.theme.normalTransition};

    &:hover {
      background-color: ${(props) => props.theme.lightBlack};
    }
  }
`;

const Default: React.FC = (): JSX.Element => {
  return (
    <Center>
      <h1>Page Does not Exist</h1>
      <Link to='/'>Home Page</Link>
    </Center>
  );
};

export default Default;
