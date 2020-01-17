import React from 'react'
import { View, Text, Modal, TouchableOpacity, ScrollView } from 'react-native'
import { Icon } from 'native-base'

import { Bid } from '../types/graphql'
import styles from '../styles/BidsModal'

type IProps = {
  visibility: boolean
  hideModal: Function
  bids: Bid[]
}

const BidsModal: React.FC<IProps> = ({ visibility, hideModal, bids }) => {
  return (
    <Modal animationType='slide' transparent={false} visible={visibility}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => hideModal()}>
            <Icon name='back' type='AntDesign' style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.headerText}>List of Bids</Text>
        </View>
        <ScrollView style={styles.modal}>
          {bids.map(bid => (
            <View style={styles.card} key={bid._id}>
              <Text style={styles.cardText}>Amount: {bid.amount}</Text>
              <Text style={styles.cardText}>By: {bid.bidBy.email}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  )
}

export default BidsModal
