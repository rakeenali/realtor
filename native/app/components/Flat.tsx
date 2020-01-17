import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

import { useAuthState } from '../store/Auth'
import BidsModal from './BidsModal'
import styles from '../styles/Flat'

import { Flat as FlatType } from '../types/graphql'

type IProps = {
  flat: FlatType
}

const Flat: React.FC<IProps> = ({ flat }) => {
  const authState = useAuthState()

  const [showModal, setShowModal] = React.useState<boolean>(false)

  return (
    <View style={styles.container}>
      <BidsModal
        visibility={showModal}
        hideModal={() => setShowModal(false)}
        bids={flat.bidsMade}
      />
      <View style={styles.card}>
        <Image
          source={{
            uri:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQmR924J3Gb8cdeUqXKp6W_9NnCxl45Mqv0dfo3UM_Q4iJWBU1p',
          }}
          style={{ width: '100%', height: 200 }}
        />
        <View style={styles.cardInner}>
          <Text style={styles.mainText}>Area: {flat.area}</Text>
          <Text style={styles.text}>Rooms: {flat.rooms}</Text>
          <Text style={{ ...styles.text, fontSize: 18 }}>
            Address: {flat.flatAddress}
          </Text>
          <View style={styles.buttonContainer} />
          {flat.bidsMade.length > 0 && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowModal(true)}>
              <Text style={styles.buttonText}>Bids Made</Text>
            </TouchableOpacity>
          )}

          {authState.userRole === 'realtor' ? (
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Make a bid</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Remove Flate</Text>
            </TouchableOpacity>
          )}
          <View style={{ marginVertical: 10 }}></View>
        </View>
      </View>
    </View>
  )
}

export default Flat
