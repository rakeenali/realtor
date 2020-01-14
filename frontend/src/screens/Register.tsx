import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'urql';
import { navigate } from '@reach/router';

import { UserInput, Message } from '../graphql';

import Container from '../utilities/Container';
import { parseError } from '../utilities/helper';

import FormComponent from '../components/FormComponent';
import { FormLoader } from '../components/Loaders';

import { useMessageDispatch, actionSetMessage } from '../store/Message';

import { Routes } from '../types';

import {
  Form,
  FormHeading,
  FormArea,
  FormGroup,
  FormError,
} from '../styles/FormStyle';

interface FormInput extends UserInput {
  password2: string;
}

const mutation = `
mutation createuser(
  $firstName: String!,
  $lastName: String!,
  $email: String!,
  $password: String!,
) {
  createUser(
    input: {
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    }
  ) {
    message
  }
}
`;

type MutationRes = {
  createUser: Message;
};

const Register = (props) => {
  const currentRef = React.useRef<HTMLLabelElement>(null);
  const { errors, handleSubmit, register, setError } = useForm<FormInput>({
    mode: 'onSubmit',
  });

  const [res, executeMutation] = useMutation<MutationRes, UserInput>(mutation);

  const messageDispatch = useMessageDispatch();

  React.useEffect(() => {
    currentRef.current?.focus();

    if (res.data?.createUser.message) {
      actionSetMessage(true, res.data.createUser.message, messageDispatch);
      navigate(Routes.LOGIN);
    }
  }, [res.data, messageDispatch]);

  const onSubmit = (data: FormInput) => {
    if (data.password.trim() !== data.password2.trim()) {
      setError(
        'password',
        '',
        'Password and Confirm Password fields did not match',
      );
      setError(
        'password2',
        '',
        'Password and Confirm Password fields did not match',
      );
      return;
    }

    executeMutation({
      email: data.email,
      firstName: data.firstName,
      password: data.password,
      lastName: data.lastName,
    });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormHeading>Register</FormHeading>
        <FormError>{res.error && parseError(res.error.message)}</FormError>
        <FormLoader loading={res.fetching} />
        <FormArea>
          <FormComponent
            htmlFor='firstName'
            labelText='First Name'
            currentRef={currentRef}
            name='firstName'
            placeholder='First Name'
            type='text'
            registerRef={register({
              required: 'First Name is required',
              minLength: {
                value: 2,
                message: 'First Name must be more that 2 characters',
              },
            })}
            hasError={errors.firstName ? true : false}
            errorMessage={errors.firstName?.message}
            disabled={res.fetching}
          />
          <FormComponent
            htmlFor='lastName'
            labelText='Last Name'
            name='lastName'
            placeholder='Last Name'
            type='text'
            registerRef={register({
              required: 'Last Name is requierd',
              minLength: {
                value: 2,
                message: 'Last Name must be more that 2 characters',
              },
            })}
            hasError={errors.lastName ? true : false}
            errorMessage={errors.lastName?.message}
            disabled={res.fetching}
          />
          <FormComponent
            htmlFor='email'
            labelText='Email'
            name='email'
            placeholder='Email'
            type='email'
            registerRef={register({
              required: 'Email is required',
            })}
            hasError={errors.email ? true : false}
            errorMessage={errors.email?.message}
            disabled={res.fetching}
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
            disabled={res.fetching}
          />
          <FormComponent
            htmlFor='password2'
            labelText='Confirm Password'
            name='password2'
            placeholder='Confirm Password'
            type='password'
            registerRef={register({
              required: 'Confirm password is required',
              minLength: {
                value: 6,
                message: 'Confirm password must be more than 6 characters',
              },
            })}
            hasError={errors.password2 ? true : false}
            errorMessage={errors.password2?.message}
            disabled={res.fetching}
          />
          <FormGroup>
            <button type='submit' disabled={res.fetching}>
              Register
            </button>
          </FormGroup>
        </FormArea>
      </Form>
    </Container>
  );
};

export default Register;
