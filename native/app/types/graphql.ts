/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export interface FlatInput {
  rooms: string
  flatImage: string
  area: string
  flatAddress: string
}

export interface UserInput {
  firstName: string
  lastName: string
  password: string
  email: string
}

export interface Authorization {
  accessToken: string
  refreshToken: string
}

export interface Bid {
  _id: string
  amount: number
  bidBy?: User
  onFlat?: Flat
}

export interface Flat {
  _id: string
  createdAt: string
  rooms: number
  flatImage: string
  area: number
  flatAddress: string
  createdBy: User
  bidsMade: Bid[]
}

export interface Message {
  message: string
}

export interface IMutation {
  createFlat(input?: FlatInput): Flat | Promise<Flat>
  placeABid(flatId: string, bidAmount?: number): Bid | Promise<Bid>
  retractABid(bidId: string): Message | Promise<Message>
  removeFlat(flatId: string): Message | Promise<Message>
  login(email: string, password: string): Authorization | Promise<Authorization>
  createUser(input?: UserInput): Message | Promise<Message>
  refreshLogin(refreshToken: string): Authorization | Promise<Authorization>
}

export interface IQuery {
  flats(): Flat[] | Promise<Flat[]>
  profile(): User | Promise<User>
}

export interface RefreshToken {
  token?: string
  expTime?: number
}

export interface User {
  _id: string
  firstName: string
  lastName: string
  role: string
  password?: string
  email: string
  refreshToken?: RefreshToken
  bidsMade?: Bid[]
  flatsPosted?: Flat[]
}
