import styled from 'styled-components';

export const Form = styled.form`
  width: 60%;
  margin: 3rem auto;
  min-height: 300px;
  height: auto;
  background-color: ${(props) => props.theme.red};
  padding: 2rem;
  border-radius: 2rem;
`;

export const BarLoaderStyle = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    width: 80%;
    color: ${(props) => props.theme.white};
  }
`;

export const FormHeading = styled.h1`
  font-size: 2rem;
  text-align: center;
`;

export const FormError = styled.h3`
  font-size: 1.5rem;
  margin: 1rem 0;
  text-align: center;
  color: #ff6e6ede;
`;

export const FormArea = styled.div`
  width: 75%;
  margin: 2rem auto;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 1.5rem 0;

  label {
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
  }

  input {
    height: 2rem;
    padding: 0.3rem;
    border: none;
    font-size: 1.3rem;
    border-radius: 0.4rem;
    color: ${(props) => props.theme.red};
  }

  span {
    margin: 0.3rem 0;
    font-size: 0.9rem;
    color: ${(props) => props.theme.black};
  }

  button {
    font-size: 1.3rem;
    width: 40%;
    align-self: flex-end;
    background-color: ${(props) => props.theme.black};
    color: ${(props) => props.theme.white};
    border: none;
    border-radius: 2rem;
    padding: 1rem 0.1rem;
    cursor: pointer;
    transition: ${(props) => props.theme.normalTransition};

    &:hover {
      background-color: ${(props) => props.theme.lightBlack};
    }
    &:active {
      background-color: ${(props) => props.theme.grey};
    }
  }
`;
