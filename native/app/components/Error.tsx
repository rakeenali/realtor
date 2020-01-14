import React from 'react'
import { Text, StyleSheet } from 'react-native'

import { INPUT_WIDTH } from '../store/Theme'

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontWeight: '600',
    alignSelf: 'center',
    width: INPUT_WIDTH,
  },
})

type IProps = {
  hasError: boolean
  message: string
}

const Error: React.FC<IProps> = props => {
  if (props.hasError) {
    return <Text style={styles.error}>{props.message}</Text>
  }

  return <></>
}

export default Error
