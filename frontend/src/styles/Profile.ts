import styled from 'styled-components';

import Container from '../utilities/Container';

export const ProfileContainer = styled(Container)`
  color: ${(props) => props.theme.black};
`;

export const Header = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-end;
  margin-bottom: 3rem;

  h1 {
    font-size: 2rem;
  }

  h2 {
    margin-top: 1rem;
    font-size: 1.3rem;
    background-color: ${(props) => props.theme.red};
    color: ${(props) => props.theme.white};
    border-radius: 2.5rem;
    padding: 0.9rem 0.7rem;

    span {
      font-weight: bolder;
      color: ${(props) => props.theme.grey};
    }
  }
`;

export const Main = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;

  @media (max-width: 680px) {
    display: flex;
    justify-content: center;
  }

  article {
    width: 30%;
    height: auto;
    margin: 1rem;
    background-color: ${(props) => props.theme.maroon};
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    border-bottom-left-radius: 1.5rem;
    border-bottom-right-radius: 1.5rem;
    color: ${(props) => props.theme.white};

    @media (max-width: 980px) {
      width: 45%;
    }

    @media (max-width: 680px) {
      width: 90%;
    }

    img {
      width: 100%;
      height: 10rem;
    }

    div {
      margin-top: 1rem;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;

      h1,
      h2 {
        font-size: 1.5rem;
        margin: 0.6rem;

        span {
          font-size: 1.2rem;
          color: ${(props) => props.theme.grey};
          font-weight: bolder;
          width: auto;
          height: auto;
          border-radius: 50%;
          padding: 5px;
          background-color: ${(props) => props.theme.white};
        }
      }

      h2 {
        font-size: 1.3rem;
      }

      h3 {
        font-size: 1.2rem;
        margin: 0.6rem;

        span {
          font-size: 1rem;
          font-weight: lighter;
          color: ${(props) => props.theme.white};
        }
      }

      hr {
        width: 100%;
        margin: 0.5rem 0;
        border-color: ${(props) => props.theme.red};
      }

      a,
      button {
        text-decoration: none;
        margin: 0.4rem 0;
        font-size: 0.95rem;
        text-transform: uppercase;
        font-weight: lighter;
        padding: 0.4rem 0.8rem;
        background-color: ${(props) => props.theme.red};
        color: ${(props) => props.theme.white};
        border-radius: 0.5rem;
        transition: ${(props) => props.theme.normalTransition};
        border: none;
        cursor: pointer;

        &:hover {
          color: ${(props) => props.theme.red};
          background-color: ${(props) => props.theme.white};
        }
      }

      button:disabled {
        color: ${(props) => props.theme.red};
        background-color: ${(props) => props.theme.white};
        cursor: not-allowed;
      }
    }
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 2000vw;
  background-color: #912f40f5;
  overflow: hidden;

  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  button {
    width: 80px;
    height: 80px;
    font-size: 50px;
    align-self: flex-end;
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: ${(props) => props.theme.white};
    transition: ${(props) => props.theme.normalTransition};

    &:hover {
      color: ${(props) => props.theme.grey};
    }
  }

  div {
    width: 65%;
    height: auto;

    @media (max-width: 700px) {
      width: 90%;
    }

    ul {
      list-style-type: none;

      li {
        font-size: 1.4rem;
        background-color: ${(props) => props.theme.maroon};
        color: ${(props) => props.theme.white};
        margin: 1rem;
        padding: 1rem;
        transition: ${(props) => props.theme.normalTransition};
        cursor: pointer;
        border-radius: 1rem;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;

        @media (max-width: 800px) {
          display: flex;
          flex-flow: column nowrap;
          justify-content: space-between;
          align-items: center;

          span {
            margin: 0.4rem 0;
          }
        }

        &:hover {
          color: ${(props) => props.theme.maroon};
          background-color: ${(props) => props.theme.white};
        }

        span {
          display: block;

          strong {
            text-decoration: underline;
          }
        }
      }
    }

    form {
      width: 60%;
      height: auto;
      background-color: ${(props) => props.theme.maroon};
      margin: 0 auto;

      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      justify-content: center;

      h2 {
        margin: 1rem 0;
        font-size: 2rem;
        color: ${(props) => props.theme.white};
      }

      div {
        display: flex;
        flex-flow: column nowrap;
        margin: 1.5rem 0;
        color: ${(props) => props.theme.white};

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
          font-size: 1.1rem;
          color: ${(props) => props.theme.lightBlack};
        }

        button {
          font-size: 1.5rem;
          width: auto;
          height: auto;
          background-color: ${(props) => props.theme.black};
          color: ${(props) => props.theme.white};
          border: none;
          padding: 0.5rem 2rem;
          cursor: pointer;
          transition: ${(props) => props.theme.normalTransition};

          &:hover {
            background-color: ${(props) => props.theme.lightBlack};
          }
          &:active {
            background-color: ${(props) => props.theme.grey};
          }
        }
      }
    }
  }
`;
