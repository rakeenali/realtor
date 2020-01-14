import { Authorization, Message, Flat } from '../types/graphql'

export const mutationLogin = `
    mutation login($email:String!,$password:String!){
        login(email:$email,password:$password){
        refreshToken
        accessToken
        }
    }
`

export interface resMutationLogin {
  login: Authorization
}

export const mutationCreateUser = `
mutation createUser(
  $firstName: String!
  $lastName: String!
  $password: String!
  $email: String!
) {
  createUser(
    input: {
      firstName: $firstName
      lastName: $lastName
      password: $password
      email: $email
    }
  ) {
    message
  }
}`

export interface resMutationCreateUser {
  createUser: Message
}

export const mutationRefreshLogin = `
mutation refreshLogin($refreshToken:String!){
  refreshLogin(refreshToken:$refreshToken){
    accessToken
    refreshToken
  }
}
`
export interface resMutationRefreshLogin {
  refreshLogin: Authorization
}

export const mutationCreateFlat = `
mutation createFlat(
  $area: Int!
  $flatImage: String!
  $rooms: Int!
  $flatAddress: String!
) {
  createFlat(
    input: {
      area: $area
      flatImage: $flatImage
      flatAddress: $flatAddress
      rooms: $rooms
    }
  ){
    _id
  }
}
`

export interface resMutationCreateFlat {
  createFlat: Flat
}

export const queryFlats = `
query {
  flats {
    _id
    area
    rooms
    flatAddress
    bidsMade {
      _id
      amount
      bidBy {
        email
      }
    }
    createdAt
    flatImage
  }
} 
`

export interface resQueryFlats {
  flats: Flat[]
}
