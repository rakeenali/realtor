import jwtDecode from 'jwt-decode';
import { DecodedToken } from '../types';

export const parseError = (errorMessage: string): string => {
  return errorMessage.split(']')[1];
};

export const validToken = (token: string): boolean => {
  const decodedToken: DecodedToken = jwtDecode(token);

  const expTime = new Date(decodedToken.exp * 1000).getTime();

  const now = new Date().getTime();

  if (expTime <= now) {
    return false;
  }
  return true;
};
