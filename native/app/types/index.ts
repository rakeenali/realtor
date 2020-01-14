export type IconType =
  | 'AntDesign'
  | 'Entypo'
  | 'EvilIcons'
  | 'Feather'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'Foundation'
  | 'Ionicons'
  | 'MaterialCommunityIcons'
  | 'MaterialIcons'
  | 'Octicons'
  | 'SimpleLineIcons'
  | 'Zocial'

export const APP_ROUTE = {
  Home: 'Home',
  Profile: 'Profile',
  CreateFlat: 'CreateFlat',
  Authenticated: 'Authenticated',
  Login: 'Login',
  Register: 'Register',
}

export type IDrawerType = {
  iconName: string
  iconType: IconType
  routeLink: string
}

export type ITabType = {
  iconName: string
  iconType: IconType
  routeLink: string
  title: string
}

export enum AppState {
  IDLE = 'idle',
  LOADING = 'loading',
  LOADED = 'loaded',
}

export enum TokenType {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
}

export type Dispatch<T> = (action: T) => void

export type DecodedToken = {
  exp: number
  iat: number
  role: string
  userId: string
}
