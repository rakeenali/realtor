import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'urql';
import { navigate } from '@reach/router';

import { useAuthDispatch, logUserIn } from '../store/Auth';

import { Authorization } from '../graphql';

import Container from '../utilities/Container';

import FormComponent from '../components/FormComponent';
import { FormLoader } from '../components/Loaders';

import { TokenType, Routes } from '../types';

import {
  Form,
  FormHeading,
  FormArea,
  FormGroup,
  FormError,
} from '../styles/FormStyle';

import { parseError } from '../utilities/helper';

interface FormInput {
  email: string;
  password: string;
}

const mutation = `
  mutation ($email:String!,$password:String!){
    login(email:$email,password:$password){
      accessToken
      refreshToken
    }
  }
`;

type QueryResp = {
  login: Authorization;
};

const Login = () => {
  const [res, executeMutation] = useMutation<QueryResp, FormInput>(mutation);
  const authDispatch = useAuthDispatch();

  const currentRef = React.useRef<HTMLLabelElement>(null);
  const { errors, handleSubmit, register } = useForm<FormInput>({
    mode: 'onSubmit',
  });

  React.useEffect(() => {
    currentRef.current?.focus();

    if (res.data?.login) {
      window.sessionStorage.setItem(
        TokenType.ACCESS_TOKEN,
        res.data.login.accessToken,
      );
      localStorage.setItem(
        TokenType.REFRESH_TOKEN,
        res.data.login.refreshToken,
      );
      navigate(Routes.HOME);
      logUserIn(authDispatch);
    }
  }, [res.data, authDispatch]);

  const onSubmit = (data: FormInput) => {
    executeMutation({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormHeading>LOGIN</FormHeading>
        <FormError>{res.error && parseError(res.error.message)}</FormError>
        <FormLoader loading={res.fetching} />
        <FormArea>
          <FormComponent
            htmlFor='email'
            labelText='Email'
            currentRef={currentRef}
            name='email'
            placeholder='Email'
            type='email'
            registerRef={register({
              required: 'Email is required',
            })}
            hasError={errors.email ? true : false}
            errorMessage={errors.email?.message}
            disabled={false}
          />
          <FormComponent
            htmlFor='password'
            labelText='Password'
            name='password'
            placeholder='Password'
            type='password'
            registerRef={register({
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be more than 6 characters',
              },
            })}
            hasError={errors.password ? true : false}
            errorMessage={errors.password?.message}
            disabled={false}
          />
          <FormGroup>
            <button type='submit'>Login</button>
          </FormGroup>
        </FormArea>
      </Form>
    </Container>
  );
};

export default Login;
