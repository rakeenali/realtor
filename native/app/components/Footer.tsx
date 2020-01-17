import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon, Grid, Row } from 'native-base'
import { DrawerContentComponentProps } from 'react-navigation-drawer'

import {
  HEADER_BG_COLOR,
  HEADER_COLOR,
  FOOTER_HEIGHT,
  INPUT_CARD_BG,
} from '../store/Theme'
import { ITabType } from '../types'

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 50,
    width: '100%',
    height: FOOTER_HEIGHT,
    backgroundColor: HEADER_BG_COLOR,
    display: 'flex',
    flexDirection: 'row',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

type IProps = DrawerContentComponentProps & {
  title: string
  routes: ITabType[]
}

const Header: React.FC<IProps> = (props): JSX.Element => {
  const activeIndex = props.navigation.state.index
  return (
    <Grid style={styles.header}>
      {props.routes.map((route, i) => (
        <Row size={1} style={styles.center} key={i}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate(route.routeLink)
            }}
            style={styles.center}>
            <Icon
              name={route.iconName}
              type={route.iconType}
              style={{
                fontSize: 35,
                color: activeIndex === i ? INPUT_CARD_BG : HEADER_COLOR,
              }}
            />
            <Text
              style={{
                fontSize: 15,
                color: activeIndex === i ? INPUT_CARD_BG : HEADER_COLOR,
              }}>
              {route.title}
            </Text>
          </TouchableOpacity>
        </Row>
      ))}
    </Grid>
  )
}

export default Header
