import React from 'react'
import { View, FlatList, ActivityIndicator, Text } from 'react-native'
import { DrawerContentComponentProps } from 'react-navigation-drawer'
import { useQuery } from 'urql'

import { HEADER_HEIGHT, BUTTON_BG_COLOR, APP_BG_COLOR } from '../store/Theme'
import Header from '../components/Header'
import Flat from '../components/Flat'
import { queryFlats, resQueryFlats } from '../gql'
import { AppState } from '../types/index'
import { Flat as FlatType } from '../types/graphql'

type IProps = DrawerContentComponentProps & {}

const Home: React.FC<IProps> = props => {
  const [res] = useQuery<resQueryFlats>({ query: queryFlats })
  const [appState, setAppState] = React.useState<AppState>(AppState.IDLE)
  const [flats, setFlats] = React.useState<FlatType[]>([])

  React.useEffect(() => {
    if (!res.fetching && res.data) {
      setFlats(res.data.flats)
      setAppState(AppState.LOADED)
    }
  }, [res.data])

  if (appState === AppState.LOADED) {
    return (
      <>
        <Header {...props} title='Home' />
        {flats.length > 0 ? (
          <View
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: HEADER_HEIGHT,
            }}>
            <FlatList
              data={flats}
              style={{ marginTop: 20 }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              pagingEnabled={true}
              renderItem={({ item }) => <Flat flat={item} />}
              keyExtractor={flat => String(flat._id)}
            />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Current have no flats</Text>
          </View>
        )}
      </>
    )
  }

  return (
    <>
      <Header {...props} title='Home' />
      <View
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size={150} color={BUTTON_BG_COLOR} />
      </View>
    </>
  )
}

export default Home
