export enum Routes {
  REGISTER = '/register',
  LOGIN = '/login',
  HOME = '/home',
  PROFILE = '/profile',
  CREATE_FLAT = '/create-flat',
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

export type Dispatch<T> = (action: T) => void;

export type DecodedToken = {
  exp: number;
  iat: number;
  role: string;
  userId: string;
};
