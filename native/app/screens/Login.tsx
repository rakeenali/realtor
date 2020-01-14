import React from 'react'
import {
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native'
import { DrawerContentComponentProps } from 'react-navigation-drawer'
import { Grid, Row } from 'native-base'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useMutation } from 'urql'
import * as SecureStore from 'expo-secure-store'

import Header from '../components/Header'
import styles from '../styles/Form'
import Error from '../components/Error'

import { onChangeHelper, parseError } from '../helper'
import { mutationLogin, resMutationLogin } from '../gql'
import { INPUT_PLACEHOLDER_COLOR, HEADER_BG_COLOR } from '../store/Theme'
import { useAuthDispatch, useAuthState, logUserIn } from '../store/Auth'
import { TokenType } from '../types'

const loginSchema = Yup.object().shape({
  email: Yup.string().required('Email is Required'),
  password: Yup.string()
    .required('Password is required')
    .min(4, 'Password must have at least 4 characters '),
})

type FormInput = {
  email: string
  password: string
}

type IProps = DrawerContentComponentProps & {}

const Login: React.FC<IProps> = props => {
  const authDispatch = useAuthDispatch()

  const passWordRef = React.useRef<TextInput>()
  const [res, executeMutation] = useMutation<resMutationLogin, FormInput>(
    mutationLogin
  )

  const formik = useFormik<FormInput>({
    initialValues: {
      email: 'r@r.com',
      password: 'hunter',
    },
    validationSchema: loginSchema,
    onSubmit,
  })

  React.useEffect(() => {
    if (res.data && !res.fetching && res.data.login) {
      Promise.all([
        SecureStore.setItemAsync(
          TokenType.ACCESS_TOKEN,
          res.data.login.accessToken
        ),
        SecureStore.setItemAsync(
          TokenType.REFRESH_TOKEN,
          res.data.login.refreshToken
        ),
        logUserIn(authDispatch),
      ])
        .then(() => {
          return
        })
        .catch(err => {
          throw err
        })
    }

    if (!res.fetching && res.error) {
      Alert.alert('Validation Error', parseError(res.error.message))
    }
  }, [res.data, res.error])

  function onSubmit(data: FormInput) {
    if (formik.isValid) {
      executeMutation(data)
    }
  }

  return (
    <>
      <Header {...props} title='Login' />
      <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
        <Grid>
          <Row size={1} style={styles.imgContianer}>
            <Image
              source={require('./login-illustration.png')}
              style={{ width: 200, height: 200 }}
            />
          </Row>
          <Row size={1.5} style={styles.formContainer}>
            <TextInput
              placeholder='Email'
              onChangeText={text =>
                onChangeHelper(text, 'email', formik.handleChange)
              }
              autoCompleteType='email'
              textContentType='emailAddress'
              value={formik.values.email}
              placeholderTextColor={INPUT_PLACEHOLDER_COLOR}
              style={{ ...styles.input, marginVertical: 10 }}
              returnKeyLabel='Next'
              returnKeyType='next'
              onSubmitEditing={() => passWordRef.current.focus()}
            />
            <Error
              hasError={formik.touched.email && formik.errors.email !== ''}
              message={formik.errors.email}
            />
            <TextInput
              ref={passWordRef}
              placeholder='Password'
              onChangeText={text =>
                onChangeHelper(text, 'password', formik.handleChange)
              }
              value={formik.values.password}
              placeholderTextColor={INPUT_PLACEHOLDER_COLOR}
              style={{ ...styles.input, marginVertical: 10 }}
              secureTextEntry={true}
            />
            <Error
              hasError={
                formik.touched.password && formik.errors.password !== ''
              }
              message={formik.errors.password}
            />
            {res.fetching ? (
              <ActivityIndicator size={80} color={HEADER_BG_COLOR} />
            ) : (
              <TouchableOpacity
                style={{ ...styles.button, marginVertical: 18 }}
                onPress={() => formik.handleSubmit()}
              >
                <Text style={styles.buttonText}>LOGIN</Text>
              </TouchableOpacity>
            )}
          </Row>
        </Grid>
      </KeyboardAvoidingView>
    </>
  )
}

export default Login

// enum: ['bidder', 'realtor'],
