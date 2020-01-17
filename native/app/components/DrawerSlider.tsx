import React from 'react'
import { StyleSheet, TouchableOpacity, View, StatusBar } from 'react-native'
import { Icon } from 'native-base'
import { DrawerContentComponentProps } from 'react-navigation-drawer'

import { IDrawerType } from '../types'

import { DRAWER_COLOR, DRAWER_WIDTH } from '../store/Theme'
import { useAuthState, useAuthDispatch, logUserOut } from '../store/Auth'

const styles = StyleSheet.create({
  box: {
    paddingTop: StatusBar.currentHeight,
    position: 'absolute',
    width: DRAWER_WIDTH,
    height: '100%',
    backgroundColor: DRAWER_COLOR,
    top: 0,
    left: 0,
    display: 'flex',
    zIndex: 100,
    justifyContent: 'space-between',
  },
  topNav: {
    width: '100%',
    height: '50%',
    paddingTop: 20,
    display: 'flex',
    alignItems: 'center',
  },
  bottomNav: {
    width: '100%',
    height: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
  iconStyle: { marginBottom: 30, color: '#fff', fontSize: 55 },
})

type IProps = DrawerContentComponentProps & {
  routes?: IDrawerType[]
}

const DrawerSlider: React.FC<IProps> = (props): JSX.Element => {
  const { isAuthenticated } = useAuthState()
  const authDispatch = useAuthDispatch()

  const activeIndex = props.navigation.state.index

  return (
    <View style={styles.box}>
      <View style={styles.topNav}>
        {props.routes.map((route, i) => (
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate(route.routeLink)
            }}
            key={i}>
            <Icon
              style={{
                ...styles.iconStyle,
                color: activeIndex === i ? '#742D2D' : '#fff',
              }}
              name={route.iconName}
              type={route.iconType}
            />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.bottomNav}>
        {isAuthenticated ? (
          <TouchableOpacity
            onPress={() => {
              logUserOut(authDispatch)
            }}>
            <Icon
              style={styles.iconStyle}
              name='logout'
              type='SimpleLineIcons'
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => console.log(1)}>
            <Icon
              style={styles.iconStyle}
              name='hands-helping'
              type='FontAwesome5'
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
export default DrawerSlider
