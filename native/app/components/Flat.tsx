import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

import BidsModal from './BidsModal'
import styles from '../styles/Flat'

const Flat = () => {
  const [showModal, setShowModal] = React.useState<boolean>(false)
  return (
    <View style={styles.container}>
      <BidsModal visibility={showModal} hideModal={() => setShowModal(false)} />
      <View style={styles.card}>
        <Image
          source={{
            uri:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQmR924J3Gb8cdeUqXKp6W_9NnCxl45Mqv0dfo3UM_Q4iJWBU1p',
          }}
          style={{ width: '100%', height: 200 }}
        />
        <View style={styles.cardInner}>
          <Text style={styles.mainText}>Area: 350</Text>
          <Text style={styles.text}>Info 1</Text>
          <Text style={styles.text}>Info 2</Text>
          <View style={styles.buttonContainer} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowModal(true)}
          >
            <Text style={styles.buttonText}>Show Modal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Remove Flate</Text>
          </TouchableOpacity>
          <View style={{ marginVertical: 10 }}></View>
        </View>
      </View>
    </View>
  )
}

export default Flat
