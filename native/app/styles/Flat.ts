import { Dimensions } from 'react-native'
import { StyleSheet } from 'react-native'

import {
  APP_TEXT_COLOR,
  APP_BG_COLOR,
  BUTTON_TEXT_COLOR,
  BUTTON_BG_COLOR,
  CARD_BG_COLOR,
} from '../store/Theme'

export default StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    height: 'auto',
  },
  card: {
    width: '80%',
    height: 'auto',
    backgroundColor: CARD_BG_COLOR,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  cardInner: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    width: '90%',
    height: 1,
    backgroundColor: APP_BG_COLOR,
    marginVertical: 10,
  },
  button: {
    width: '60%',
    height: 40,
    backgroundColor: BUTTON_BG_COLOR,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 40,
  },
  mainText: {
    color: APP_TEXT_COLOR,
    fontSize: 30,
  },
  text: {
    color: APP_TEXT_COLOR,
    fontSize: 24,
  },
  buttonText: {
    color: BUTTON_TEXT_COLOR,
    fontSize: 18,
  },
})
