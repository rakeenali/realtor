import { StyleSheet } from 'react-native'

import {
  HEADER_HEIGHT,
  APP_BG_COLOR,
  INPUT_CARD_BG,
  BUTTON_SHADOW_COLOR,
  BUTTON_BG_COLOR,
  BUTTON_TEXT_COLOR,
  INPUT_WIDTH,
} from '../store/Theme'

export default StyleSheet.create({
  container: {
    marginTop: HEADER_HEIGHT,
    flex: 1,
    backgroundColor: APP_BG_COLOR,
  },
  imgContianer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  formContainer: {
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    width: INPUT_WIDTH,
    height: 60,
    backgroundColor: INPUT_CARD_BG,
    fontSize: 20,
    borderRadius: 10,
    marginBottom: 10,
    paddingLeft: 5,
  },
  button: {
    width: '65%',
    height: 70,
    backgroundColor: BUTTON_BG_COLOR,
    borderRadius: 10,
    marginBottom: 10,
    paddingLeft: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    shadowColor: BUTTON_SHADOW_COLOR,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  buttonText: {
    fontSize: 25,
    color: BUTTON_TEXT_COLOR,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
})
