import React from 'react'
import { View, Text } from 'react-native'
import { DrawerContentComponentProps } from 'react-navigation-drawer'

import Header from '../components/Header'

type IProps = DrawerContentComponentProps & {}

const Profile: React.FC<IProps> = props => {
  return (
    <>
      <Header {...props} title='Profile' />
      <Text>profile</Text>
    </>
  )
}

export default Profile
