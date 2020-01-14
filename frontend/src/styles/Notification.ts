import styled from 'styled-components';

export const Popup = styled.div`
  color: black;
  position: fixed;
  top: 10%;
  left: 50%;
  min-width: 400px;
  box-shadow: 0 24.9px 21.1px -31px rgba(0, 0, 0, -0.045),
    0 41.7px 36.6px -31px rgba(0, 0, 0, -0.012),
    0 53.5px 52.1px -31px rgba(0, 0, 0, 0.037),
    0 67px 75.2px -31px rgba(0, 0, 0, 0.099),
    0 119px 142px -31px rgba(0, 0, 0, 0.19);

  height: auto;
  transform: translate(-50%, -10%);
  font-size: 1.2rem;
  display: grid;
  grid-gap: 1rem;
  padding: 0.5rem 0.8rem;
  grid-template-columns: 4fr 1fr;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  z-index: 999;
  background-color: ${(props) => props.theme.grey};

  span {
    font-weight: bolder;
    color: ${(props) => props.theme.white};
  }
`;

export const CloseButton = styled.span`
  z-index: 1000;
  margin-left: 0.5rem;
  flex-basis: 5%;
  font-size: 2.5rem;
  font-weight: bolder;
  margin-left: auto;
  cursor: pointer;
  color: ${(props) => props.theme.white};
  transition: ${(props) => props.theme.normalTransition};

  &:hover {
    color: ${(props) => props.theme.lightBlack};
  }
`;
