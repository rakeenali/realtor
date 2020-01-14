import React from 'react'
import { Alert, View, ActivityIndicator } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { useMutation } from 'urql'

import { AuthContainer, UnAuthContainer } from './RouteContianer'

import { APP_BG_COLOR, BUTTON_BG_COLOR } from './store/Theme'
import { logUserIn, useAuthDispatch, useAuthState } from './store/Auth'
import { TokenType, AppState } from './types'
import { validToken, parseError } from './helper'
import { mutationRefreshLogin, resMutationRefreshLogin } from './gql'

type RefreshLoginInput = {
  refreshToken: string
}

const Index = () => {
  const authDispatch = useAuthDispatch()
  const authState = useAuthState()

  const [res, executeMutation] = useMutation<
    resMutationRefreshLogin,
    RefreshLoginInput
  >(mutationRefreshLogin)

  const [appState, setAppState] = React.useState<AppState>(AppState.IDLE)

  React.useEffect(() => {
    // SecureStore.deleteItemAsync(TokenType.ACCESS_TOKEN).then(() => {
    //   SecureStore.deleteItemAsync(TokenType.REFRESH_TOKEN).then(() => {
    //     console.log('removed')
    //   })
    // })
    setAppState(AppState.LOADING)
    ;(async () => {
      try {
        const accessToken = await SecureStore.getItemAsync(
          TokenType.ACCESS_TOKEN
        )

        if (accessToken && validToken(accessToken)) {
          await logUserIn(authDispatch)
          setAppState(AppState.LOADED)
          return
        }

        const refreshToken = await SecureStore.getItemAsync(
          TokenType.REFRESH_TOKEN
        )
        if (refreshToken) {
          executeMutation({ refreshToken: refreshToken })
          return
        }
        setAppState(AppState.LOADED)
      } catch (err) {
        throw err
      }
    })()
  }, [])

  React.useEffect(() => {
    if (!res.fetching && res.error) {
      setAppState(AppState.LOADED)
      Alert.alert('Token Expired', parseError(res.error.message))
      return
    }

    if (!res.fetching && res.data && res.data.refreshLogin) {
      Promise.all([
        SecureStore.setItemAsync(
          TokenType.ACCESS_TOKEN,
          res.data.refreshLogin.accessToken
        ),
        SecureStore.setItemAsync(
          TokenType.REFRESH_TOKEN,
          res.data.refreshLogin.refreshToken
        ),
        logUserIn(authDispatch),
      ])
        .then(() => {
          setAppState(AppState.LOADED)
          return
        })
        .catch(err => {
          throw err
        })
    }
  }, [res.data, res.error])

  if (appState === AppState.IDLE || appState === AppState.LOADING) {
    return (
      <View
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: APP_BG_COLOR,
        }}
      >
        <ActivityIndicator size={150} color={BUTTON_BG_COLOR} />
      </View>
    )
  }

  if (authState.isAuthenticated) {
    return <AuthContainer />
  }
  return <UnAuthContainer />
}

export default Index
