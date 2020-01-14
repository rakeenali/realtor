import React from 'react'
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native'
import { DrawerContentComponentProps } from 'react-navigation-drawer'
import { useFormik } from 'formik'
import { useMutation } from 'urql'
import * as Yup from 'yup'

import Header from '../components/Header'
import Error from '../components/Error'
import styles from '../styles/Form'

import { INPUT_PLACEHOLDER_COLOR, BUTTON_BG_COLOR } from '../store/Theme'
import { useAuthState } from '../store/Auth'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FlatInput } from '../types/graphql'
import { onChangeHelper, parseError } from '../helper'
import { mutationCreateFlat, resMutationCreateFlat } from '../gql'
import { APP_ROUTE } from '../types'

const createFlatSchema = Yup.object().shape({
  area: Yup.string().required('Area is Required'),
  flatImage: Yup.string().required('Flat Image is Required'),
  flatAddress: Yup.string().required('Flat Address is Required'),
  rooms: Yup.string().required('Rooms is Required'),
})

type IProps = DrawerContentComponentProps & {}

const INITAIL_VALUES = { area: '', flatAddress: '', flatImage: '', rooms: '' }

const CreateFlat: React.FC<IProps> = props => {
  const [res, executeMutation] = useMutation<resMutationCreateFlat>(
    mutationCreateFlat
  )

  const authState = useAuthState()

  const formik = useFormik<FlatInput>({
    initialValues: INITAIL_VALUES,
    onSubmit,
    validationSchema: createFlatSchema,
  })

  const roomsRef = React.useRef<TextInput>()
  const flatAddressRef = React.useRef<TextInput>()
  const flatImageRef = React.useRef<TextInput>()

  React.useEffect(() => {
    if (!res.fetching && res.data && res.data.createFlat) {
      formik.resetForm()
      props.navigation.navigate(APP_ROUTE.Home)
    }

    if (!res.fetching && res.error) {
      formik.resetForm()
      Alert.alert('Error', parseError(res.error.message))
    }
  }, [res.data, res.error])

  function onSubmit(data: FlatInput) {
    if (formik.isValid) {
      executeMutation(
        {
          ...data,
          area: Number(data.area),
          rooms: Number(data.rooms),
        },
        {
          fetchOptions: {
            headers: {
              Authorization: authState.accessToken,
            },
          },
        }
      )
    }
  }

  return (
    <>
      <Header {...props} title='Create Flat' />
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.formContainer}>
          <TextInput
            placeholder='Area'
            onChangeText={text =>
              onChangeHelper(text, 'area', formik.handleChange)
            }
            value={formik.values.area}
            autoCompleteType='off'
            placeholderTextColor={INPUT_PLACEHOLDER_COLOR}
            style={{ ...styles.input, marginVertical: 10 }}
            returnKeyLabel='Next'
            returnKeyType='next'
            onSubmitEditing={() => roomsRef.current.focus()}
          />
          <Error
            hasError={formik.touched.area && formik.errors.area !== ''}
            message={formik.errors.area}
          />
          <TextInput
            placeholder='Rooms'
            autoCompleteType='off'
            ref={roomsRef}
            onChangeText={text =>
              onChangeHelper(text, 'rooms', formik.handleChange)
            }
            value={formik.values.rooms}
            placeholderTextColor={INPUT_PLACEHOLDER_COLOR}
            style={{ ...styles.input, marginVertical: 10 }}
            returnKeyLabel='Next'
            returnKeyType='next'
            onSubmitEditing={() => flatAddressRef.current.focus()}
          />
          <Error
            hasError={formik.touched.rooms && formik.errors.rooms !== ''}
            message={formik.errors.rooms}
          />
          <TextInput
            ref={flatAddressRef}
            placeholder='Address'
            value={formik.values.flatAddress}
            onChangeText={text =>
              onChangeHelper(text, 'flatAddress', formik.handleChange)
            }
            autoCompleteType='off'
            placeholderTextColor={INPUT_PLACEHOLDER_COLOR}
            style={{ ...styles.input, marginVertical: 10 }}
            returnKeyLabel='Next'
            returnKeyType='next'
            onSubmitEditing={() => flatImageRef.current.focus()}
          />
          <Error
            hasError={
              formik.touched.flatAddress && formik.errors.flatAddress !== ''
            }
            message={formik.errors.flatAddress}
          />
          <TextInput
            placeholder='Image'
            ref={flatImageRef}
            autoCompleteType='off'
            onChangeText={text =>
              onChangeHelper(text, 'flatImage', formik.handleChange)
            }
            value={formik.values.flatImage}
            placeholderTextColor={INPUT_PLACEHOLDER_COLOR}
            style={{ ...styles.input, marginVertical: 10 }}
            returnKeyLabel='Done'
            returnKeyType='done'
          />
          <Error
            hasError={
              formik.touched.flatImage && formik.errors.flatImage !== ''
            }
            message={formik.errors.flatImage}
          />
          {res.fetching ? (
            <ActivityIndicator size={50} color={BUTTON_BG_COLOR} />
          ) : (
            <TouchableOpacity
              style={{
                ...styles.button,
                marginVertical: 18,
                width: Dimensions.get('window').width - 40,
              }}
              onPress={() => {
                formik.handleSubmit()
              }}
            >
              <Text style={styles.buttonText}>CREATE FLAT</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </>
  )
}

export default CreateFlat
