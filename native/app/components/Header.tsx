import React from 'react'
import { Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native'
import { Icon, Grid, Row } from 'native-base'
import { DrawerContentComponentProps } from 'react-navigation-drawer'

import { HEADER_BG_COLOR, HEADER_COLOR, HEADER_HEIGHT } from '../store/Theme'

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 50,
    width: '100%',
    height: HEADER_HEIGHT,
    paddingTop: StatusBar.currentHeight,
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
}

const Header: React.FC<IProps> = (props): JSX.Element => {
  return (
    <Grid style={styles.header}>
      <Row size={1} style={styles.center}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.openDrawer()
          }}
        >
          <Icon
            name='menu'
            type='Feather'
            style={{ fontSize: 30, color: HEADER_COLOR }}
          />
        </TouchableOpacity>
      </Row>
      <Row size={3} style={styles.center}>
        <Text
          style={{
            fontSize: 25,
            color: HEADER_COLOR,
            textTransform: 'uppercase',
          }}
        >
          {props.title}
        </Text>
      </Row>
      <Row size={1}></Row>
    </Grid>
  )
}

export default Header
