import styled from 'styled-components';

export const FullScreenLoaderStyle = styled.div`
  width: 100vw;
  height: calc(100vh - ${(props) => props.theme.navbarHeigth});
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    color: ${(props) => props.theme.white};
  }
`;

export const ContainerLoaderStyle = styled.div`
  width: 100vw;
  height: calc(100vh - ${(props) => props.theme.navbarHeigth});
  display: flex;
  justify-content: center;
  align-items: center;
`;
