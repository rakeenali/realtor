import React from 'react'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import LoginScreen from './screens/Login'
import RegisterScreen from './screens/Register'
import CreateFlatScreen from './screens/CreateFlat'
import HomeScreen from './screens/Home'
import ProfileScreen from './screens/Profile'

import DrawerSlider from './components/DrawerSlider'
import Footer from './components/Footer'

import { DRAWER_WIDTH } from './store/Theme'
import { IDrawerType, ITabType, APP_ROUTE } from './types'

const tabRoutes: ITabType[] = [
  {
    routeLink: APP_ROUTE.Home,
    iconName: 'home',
    iconType: 'Feather',
    title: 'Home',
  },
  {
    routeLink: APP_ROUTE.Profile,
    iconName: 'person',
    iconType: 'Octicons',
    title: 'Profile',
  },
  {
    routeLink: APP_ROUTE.CreateFlat,
    iconName: 'md-create',
    iconType: 'Ionicons',
    title: 'Create Flat',
  },
]

const bottomTab = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Profile: ProfileScreen,
    CreateFlat: CreateFlatScreen,
  },
  {
    initialRouteName: APP_ROUTE.Home,
    tabBarComponent: props => <Footer {...props} routes={tabRoutes} />,
  }
)

const authRoutes: IDrawerType[] = [
  {
    routeLink: APP_ROUTE.Authenticated,
    iconName: 'home',
    iconType: 'Feather',
  },
]

const authDrawer = createDrawerNavigator(
  {
    Authenticated: bottomTab,
  },
  {
    initialRouteName: APP_ROUTE.Authenticated,
    drawerWidth: DRAWER_WIDTH,
    contentComponent: props => <DrawerSlider {...props} routes={authRoutes} />,
  }
)

const unAuthRoutes: IDrawerType[] = [
  {
    routeLink: APP_ROUTE.Login,
    iconName: 'login',
    iconType: 'MaterialCommunityIcons',
  },
  {
    routeLink: APP_ROUTE.Register,
    iconName: 'sign-in',
    iconType: 'Octicons',
  },
]

const unAuthDrawer = createDrawerNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
  },
  {
    initialRouteName: APP_ROUTE.Login,
    drawerWidth: DRAWER_WIDTH,
    contentComponent: props => (
      <DrawerSlider {...props} routes={unAuthRoutes} />
    ),
  }
)

export const AuthContainer = createAppContainer(authDrawer)
export const UnAuthContainer = createAppContainer(unAuthDrawer)
