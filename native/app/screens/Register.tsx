import React from 'react'
import {
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from 'react-native'
import { DrawerContentComponentProps } from 'react-navigation-drawer'
import { Grid, Row } from 'native-base'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from 'urql'

import { onChangeHelper, parseError } from '../helper'
import Header from '../components/Header'
import { INPUT_PLACEHOLDER_COLOR, BUTTON_BG_COLOR } from '../store/Theme'
import { mutationCreateUser, resMutationCreateUser } from '../gql'
import { APP_ROUTE } from '../types'

import styles from '../styles/Form'

const registerSchema = Yup.object().shape({
  email: Yup.string().required('Email is Required'),
  firstName: Yup.string().required('First Name is Required'),
  lastName: Yup.string().required('Last Name is Required'),
  password: Yup.string()
    .required('Password is required')
    .min(4, 'Password must have at least 4 characters '),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .min(4, 'Confirm Password must have at least 4 characters '),
})

type FormValue = {
  firstName: string
  lastName: string
  password: string
  confirmPassword: string
  email: string
}

type IProps = DrawerContentComponentProps & {}

const Register: React.FC<IProps> = props => {
  const [res, executeMutation] = useMutation<resMutationCreateUser, FormValue>(
    mutationCreateUser
  )

  const lastNameRef = React.useRef<TextInput>()
  const emailRef = React.useRef<TextInput>()
  const passwordRef = React.useRef<TextInput>()
  const confirmPasswordRef = React.useRef<TextInput>()

  const formik = useFormik<FormValue>({
    initialValues: {
      email: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      password: '',
    },
    onSubmit,
    validationSchema: registerSchema,
  })

  React.useEffect(() => {
    if (!res.fetching && res.error) {
      Alert.alert('Conflict', parseError(res.error.message))
      return
    }

    if (!res.fetching && res.data && res.data.createUser) {
      Alert.alert('Success', res.data.createUser.message, [
        {
          text: 'OK',
          onPress: () => {
            props.navigation.navigate(APP_ROUTE.Login)
            return
          },
        },
      ])
      return
    }
  }, [res.data, res.error])

  function onSubmit(data: FormValue) {
    if (data.password !== data.confirmPassword) {
      Alert.alert('Error', 'Passwords did not match')
      return
    }
    executeMutation(data)
  }

  return (
    <>
      <Header {...props} title='Register' />
      <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
        <Grid>
          <Row size={1} style={styles.imgContianer}>
            <Image
              source={require('./register-illustration.png')}
              style={{ width: 150, height: 150 }}
            />
          </Row>
          <Row size={3} style={styles.formContainer}>
            <TextInput
              placeholder={
                (formik.touched.firstName && formik.errors.firstName !== '') ===
                true
                  ? formik.errors.firstName
                  : 'First Name'
              }
              placeholderTextColor={
                (formik.touched.firstName && formik.errors.firstName !== '') ===
                true
                  ? 'red'
                  : INPUT_PLACEHOLDER_COLOR
              }
              style={styles.input}
              onChangeText={text =>
                onChangeHelper(text, 'firstName', formik.handleChange)
              }
              value={formik.values.firstName}
              returnKeyLabel='Next'
              returnKeyType='next'
              onSubmitEditing={() => lastNameRef.current.focus()}
            />
            <TextInput
              ref={lastNameRef}
              placeholder={
                (formik.touched.lastName && formik.errors.lastName !== '') ===
                true
                  ? formik.errors.lastName
                  : 'Last Name'
              }
              placeholderTextColor={
                (formik.touched.lastName && formik.errors.lastName !== '') ===
                true
                  ? 'red'
                  : INPUT_PLACEHOLDER_COLOR
              }
              style={styles.input}
              onChangeText={text =>
                onChangeHelper(text, 'lastName', formik.handleChange)
              }
              value={formik.values.lastName}
              returnKeyLabel='Next'
              returnKeyType='next'
              onSubmitEditing={() => emailRef.current.focus()}
            />
            <TextInput
              ref={emailRef}
              placeholder={
                (formik.touched.email && formik.errors.email !== '') === true
                  ? formik.errors.email
                  : 'Email'
              }
              placeholderTextColor={
                (formik.touched.email && formik.errors.email !== '') === true
                  ? 'red'
                  : INPUT_PLACEHOLDER_COLOR
              }
              style={styles.input}
              onChangeText={text =>
                onChangeHelper(text, 'email', formik.handleChange)
              }
              value={formik.values.email}
              returnKeyLabel='Next'
              returnKeyType='next'
              onSubmitEditing={() => passwordRef.current.focus()}
            />
            <TextInput
              ref={passwordRef}
              placeholder={
                (formik.touched.password && formik.errors.password !== '') ===
                true
                  ? formik.errors.password
                  : 'Password'
              }
              placeholderTextColor={
                (formik.touched.password && formik.errors.password !== '') ===
                true
                  ? 'red'
                  : INPUT_PLACEHOLDER_COLOR
              }
              style={styles.input}
              secureTextEntry={true}
              onChangeText={text =>
                onChangeHelper(text, 'password', formik.handleChange)
              }
              value={formik.values.password}
              returnKeyLabel='Next'
              returnKeyType='next'
              onSubmitEditing={() => confirmPasswordRef.current.focus()}
            />
            <TextInput
              ref={confirmPasswordRef}
              placeholder={
                (formik.touched.confirmPassword &&
                  formik.errors.confirmPassword !== '') === true
                  ? formik.errors.confirmPassword
                  : 'Confirm Password'
              }
              placeholderTextColor={
                (formik.touched.confirmPassword &&
                  formik.errors.confirmPassword !== '') === true
                  ? 'red'
                  : INPUT_PLACEHOLDER_COLOR
              }
              style={styles.input}
              secureTextEntry={true}
              onChangeText={text =>
                onChangeHelper(text, 'confirmPassword', formik.handleChange)
              }
              value={formik.values.confirmPassword}
              returnKeyLabel='Done'
              returnKeyType='done'
            />
            {res.fetching ? (
              <ActivityIndicator size={50} color={BUTTON_BG_COLOR} />
            ) : (
              <TouchableOpacity
                style={styles.button}
                onPress={() => formik.handleSubmit()}
              >
                <Text style={styles.buttonText}>REGISTER</Text>
              </TouchableOpacity>
            )}
          </Row>
        </Grid>
      </KeyboardAvoidingView>
    </>
  )
}

export default Register
