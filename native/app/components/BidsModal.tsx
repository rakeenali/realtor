import React from 'react'
import { View, Text, Modal, TouchableOpacity, ScrollView } from 'react-native'
import { Icon } from 'native-base'

import styles from '../styles/BidsModal'

type IProps = {
  visibility: boolean
  hideModal: Function
}

const BidsModal: React.FC<IProps> = ({ visibility, hideModal }) => {
  return (
    <Modal animationType='slide' transparent={false} visible={visibility}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => hideModal()}
          >
            <Icon name='back' type='AntDesign' style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.headerText}>List of Bids</Text>
        </View>
        <ScrollView style={styles.modal}>
          <View style={styles.card}>
            <Text style={styles.cardText}>Amount: 200</Text>
            <Text style={styles.cardText}>By: Rakeen Ali</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardText}>Amount: 200</Text>
            <Text style={styles.cardText}>By: Rakeen Ali</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardText}>Amount: 200</Text>
            <Text style={styles.cardText}>By: Rakeen Ali</Text>
          </View>
        </ScrollView>
      </View>
    </Modal>
  )
}

export default BidsModal
