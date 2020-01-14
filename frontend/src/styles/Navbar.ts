import styled from 'styled-components';

interface IListProps {
  active?: boolean;
}

export const Nav = styled.nav`
  width: 100%;
  height: ${(props) => props.theme.navbarHeigth};
  background-color: ${(props) => props.theme.maroon};
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding: 0 2rem;
`;

export const Logo = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  h2 {
    font-size: 2rem;
    cursor: pointer;
  }
`;

export const UL = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 1.2rem;
  list-style-type: none;
`;

export const LI = styled.li<IListProps>`
  margin: 0 1rem;
  cursor: pointer;
  background-color: ${(props) => props.theme.red};
  color: ${(props) => props.theme.white};
  padding: 0.5rem 0.8rem;
  border-radius: 10px;
  transition: ${(props) => props.theme.normalTransition};
  box-shadow: ${(props) =>
    props.active && `inset 1px 1px 8px 1px ${props.theme.white}`};
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;

  button {
    border: none;
    background-color: transparent;
    font-weight: lighter;
    text-decoration: none;
    color: inherit;
    font-size: inherit;
    cursor: pointer;
    outline: none;
    text-transform: inherit;
  }

  a {
    font-weight: lighter;
    text-decoration: none;
    color: inherit;
  }

  &:hover {
    background-color: ${(props) => props.theme.white};
    color: ${(props) => props.theme.red};
  }
`;
