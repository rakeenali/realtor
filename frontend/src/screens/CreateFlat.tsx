import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'urql';
import { redirectTo } from '@reach/router';

import { Flat, FlatInput } from '../graphql';

import Container from '../utilities/Container';

import FormComponent from '../components/FormComponent';
import { FormLoader } from '../components/Loaders';

import {
  Form,
  FormHeading,
  FormArea,
  FormGroup,
  FormError,
} from '../styles/FormStyle';

import { useAuthState } from '../store/Auth';

import { parseError } from '../utilities/helper';

import { Routes } from '../types';

const mutationCreateFlat = `
mutation createFlat(
    $rooms: Int!
    $flatImage: String!
    $area: Int!
    $flatAddress: String!
  ) {
    createFlat(
      input: {
        rooms: $rooms
        flatImage:$flatImage
        area: $area
        flatAddress: $flatAddress
      }
    ) {
      _id
    }
  }  
`;

type MutationCreateFlatResp = {
  createFlat: Flat;
};

const CreateFlat = () => {
  const authState = useAuthState();
  const currentRef = React.useRef<HTMLLabelElement>(null);
  const { handleSubmit, register, errors } = useForm<FlatInput>({
    mode: 'onSubmit',
  });
  const [res, executeMutation] = useMutation<MutationCreateFlatResp, FlatInput>(
    mutationCreateFlat,
  );

  React.useEffect(() => {
    currentRef.current?.focus();
  }, []);

  React.useEffect(() => {
    if (!res.fetching && res.data?.createFlat) {
      redirectTo(Routes.PROFILE);
    }
  }, [res]);

  const onSubmit = (data: FlatInput) => {
    data['area'] = Number(data.area);
    data['rooms'] = Number(data.rooms);

    executeMutation(
      { ...data },
      {
        fetchOptions: {
          headers: {
            Authorization: authState.accessToken,
          },
        },
      },
    );
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormHeading>LOGIN</FormHeading>
        <FormError>{res.error && parseError(res.error.message)}</FormError>
        <FormLoader loading={res.fetching} />
        <FormArea>
          <FormComponent
            htmlFor='rooms'
            labelText='Number of rooms'
            currentRef={currentRef}
            name='rooms'
            placeholder='# of Rooms'
            type='number'
            registerRef={register({
              required: 'Number of rooms is required',
            })}
            hasError={errors.rooms ? true : false}
            errorMessage={errors.rooms?.message}
            disabled={false}
          />
          <FormComponent
            htmlFor='area'
            labelText='Area of the flat'
            name='area'
            placeholder='Flat Area'
            type='number'
            registerRef={register({
              required: 'Flat area is required',
            })}
            hasError={errors.area ? true : false}
            errorMessage={errors.area?.message}
            disabled={false}
          />
          <FormComponent
            htmlFor='address'
            labelText='Address of the flat'
            name='flatAddress'
            placeholder='Flat address'
            type='text'
            registerRef={register({
              required: 'Flat address is required',
            })}
            hasError={errors.flatAddress ? true : false}
            errorMessage={errors.flatAddress?.message}
            disabled={false}
          />
          <FormComponent
            htmlFor='flatImage'
            labelText='Image of the flat'
            name='flatImage'
            placeholder='Flat Image url'
            type='text'
            registerRef={register({
              required: 'Flat image is required',
            })}
            hasError={errors.flatAddress ? true : false}
            errorMessage={errors.flatAddress?.message}
            disabled={false}
          />
          <FormGroup>
            <button type='submit'>Create</button>
          </FormGroup>
        </FormArea>
      </Form>
    </Container>
  );
};

export default CreateFlat;
