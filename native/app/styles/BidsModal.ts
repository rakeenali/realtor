import { StyleSheet } from 'react-native'

import {
  HEADER_BG_COLOR,
  HEADER_COLOR,
  HEADER_HEIGHT,
  CARD_BG_COLOR,
  APP_BG_COLOR,
} from '../store/Theme'

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    backgroundColor: HEADER_BG_COLOR,
    height: HEADER_HEIGHT - 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  iconButton: { flex: 1 },
  icon: { color: HEADER_COLOR, fontSize: 30 },
  headerText: {
    color: HEADER_COLOR,
    fontSize: 30,
    flex: 3,
  },
  modal: {
    flex: 1,
    backgroundColor: APP_BG_COLOR,
    paddingTop: 20,
  },
  card: {
    backgroundColor: CARD_BG_COLOR,
    width: '90%',
    height: 60,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 13,
    borderRadius: 60,
    shadowColor: '#742D2D',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  cardText: { fontSize: 16 },
})
